import { userModel } from '../models/usermodel';
import { organizationService } from '../services/organizationservice';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { Types } from 'mongoose';

export const authService = {
    register: async (username: string, password: string, organizationName: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            password: hashedPassword,
            organizationId: undefined as any // Initial placeholder
        });

        const organization = await organizationService.createOrganization(organizationName, user._id.toString());
        user.organizationId = new Types.ObjectId(organization._id);
        await user.save();

        return user;
    },

    login: async (username: string, password: string) => {
        const user = await userModel.findOne({ username });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { id: user._id.toString(), organizationId: user.organizationId.toString() },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        return token;
    }
};
