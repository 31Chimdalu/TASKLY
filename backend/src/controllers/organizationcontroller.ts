import { Request, Response } from 'express';
import { organizationService } from '../services/organizationservice';

export const createOrganization = async (req: Request, res: Response) => {
    const { name } = req.body;
    const ownerId = req.user.id
    const organization = await organizationService.createOrganization(name, ownerId);
    res.status(201).json(organization);
};
