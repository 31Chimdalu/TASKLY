import { organizationModel } from '../../models/organizationmodel';

describe('Organization Model', () => {
    it('should create a new organization', async () => {
        const organization = await organizationModel.create({ name: 'Test Organization' });
        expect(organization).toHaveProperty('name', 'Test Organization');
    });
});
