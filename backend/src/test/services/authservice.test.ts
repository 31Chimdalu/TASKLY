import { authService } from '../../services/authservice';
import { userModel } from '../../models/usermodel';
import { organizationService } from '../../services/organizationservice';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../models/userModel');
jest.mock('../organizationService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should create a user and organization', async () => {
            const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedpassword', organizationId: 'org123' };
            const mockOrganization = { _id: 'org123', name: 'TestOrg', owner: 'user123' };

            (userModel.create as jest.Mock).mockResolvedValue(mockUser);
            (organizationService.createOrganization as jest.Mock).mockResolvedValue(mockOrganization);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

            const result = await authService.register('testuser', 'password123', 'TestOrg');

            expect(userModel.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedpassword', organizationId: undefined });
            expect(organizationService.createOrganization).toHaveBeenCalledWith('TestOrg', 'user123');
            expect(result.organizationId).toEqual('org123');
        });
    });

    describe('login', () => {
        it('should return a JWT token on successful login', async () => {
            const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedpassword', organizationId: 'org123' };
            (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('mockToken');

            const result = await authService.login('testuser', 'password123');

            expect(result).toEqual('mockToken');
        });
    });
});
