import { notificationService } from '../../services/notificationservice';

describe('Notification Service', () => {
    it('should get notifications', async () => {
        const notifications = await notificationService.getNotifications('userId');
        expect(notifications).toBeInstanceOf(Array);
    });
});
