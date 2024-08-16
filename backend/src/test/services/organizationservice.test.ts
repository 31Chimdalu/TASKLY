import { organizationService } from '../../services/organizationservice';
import { organizationModel } from '../../models/organizationmodel';
import { taskService } from '../../services/taskservice';
import nodemailer from 'nodemailer';
import nodeSchedule from 'node-schedule';
import { Types } from 'mongoose';

// Mocking the necessary modules and services
jest.mock('../../models/organizationModel');
jest.mock('../taskService');
jest.mock('nodemailer');
jest.mock('node-schedule');

describe('Organization Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createOrganization', () => {
        it('should create an organization with the given name and ownerId', async () => {
            // Arrange
            const mockOrganization = {
                _id: new Types.ObjectId(),
                name: 'TestOrg',
                owner: new Types.ObjectId()
            };
            (organizationModel.create as jest.Mock).mockResolvedValue(mockOrganization);

            // Act
            const result = await organizationService.createOrganization('TestOrg', 'ownerId123');

            // Assert
            expect(organizationModel.create).toHaveBeenCalledWith({
                name: 'TestOrg',
                owner: new Types.ObjectId('ownerId123')
            });
            expect(result).toEqual(mockOrganization);
        });
    });

    describe('scheduleWeeklyReports', () => {
        it('should schedule a weekly report for all organizations', async () => {
            // Arrange
            const mockOrganization = {
                _id: new Types.ObjectId(),
                name: 'TestOrg',
                owner: { email: 'owner@example.com' }
            };
            const mockReport = { completedTasks: 5, pendingTasks: 3, averageCompletionTime: 3600 };

            (organizationModel.find as jest.Mock).mockResolvedValue([mockOrganization]);
            (taskService.generateWeeklyReport as jest.Mock).mockResolvedValue(mockReport);

            const mockSendMail = jest.fn();
            (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: mockSendMail });

            // Act
            await organizationService.scheduleWeeklyReports();

            // Assert
            expect(nodeSchedule.scheduleJob).toHaveBeenCalledWith('0 0 * * 0', expect.any(Function));

            // Simulate the scheduled job execution
            const scheduledJobCallback = (nodeSchedule.scheduleJob as jest.Mock).mock.calls[0][1];
            await scheduledJobCallback();

            expect(organizationModel.find).toHaveBeenCalled();
            expect(taskService.generateWeeklyReport).toHaveBeenCalledWith(mockOrganization._id);
            expect(mockSendMail).toHaveBeenCalledWith({
                from: expect.any(String),
                to: 'owner@example.com',
                subject: 'Weekly Task Report',
                text: `Weekly Task Report: ${JSON.stringify(mockReport)}`,
            });
        });

        it('should throw an error if the owner email is missing', async () => {
            // Arrange
            const mockOrganization = {
                _id: new Types.ObjectId(),
                name: 'TestOrg',
                owner: {} // Missing email
            };
            (organizationModel.find as jest.Mock).mockResolvedValue([mockOrganization]);

            // Act & Assert
            await expect(organizationService.scheduleWeeklyReports()).rejects.toThrow(
                'Owner not populated or missing email'
            );
        });
    });

    describe('sendReport', () => {
        it('should send an email with the provided report', async () => {
            // Arrange
            const mockSendMail = jest.fn();
            (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: mockSendMail });

            const mockEmail = 'owner@example.com';
            const mockReport = { completedTasks: 5, pendingTasks: 3, averageCompletionTime: 3600 };

            // Act
            await organizationService.sendReport(mockEmail, mockReport);

            // Assert
            expect(mockSendMail).toHaveBeenCalledWith({
                from: expect.any(String),
                to: mockEmail,
                subject: 'Weekly Task Report',
                text: `Weekly Task Report: ${JSON.stringify(mockReport)}`,
            });
        });
    });
});
