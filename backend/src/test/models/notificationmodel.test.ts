import { notificationModel } from '../../models/notificationmodel';

describe('Notification Model', () => {
    it('should create a new notification', async () => {
        const notification = await notificationModel.create({ userId: 'userId', message: 'Test notification' });
        expect(notification).toHaveProperty('message', 'Test notification');
    });
});
