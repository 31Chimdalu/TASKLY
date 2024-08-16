import { userModel } from '../../models/usermodel';
import mongoose from 'mongoose';

describe('User Model', () => {
    it('should correctly save a user', async () => {
        const user = new userModel({
            username: 'testuser',
            password: 'password123',
            organizationId: new mongoose.Types.ObjectId(),
            email: 'test@example.com'
        });

        const savedUser = await user.save();
        expect(savedUser.username).toBe('testuser');
        expect(savedUser).toHaveProperty('_id');
    });
});
