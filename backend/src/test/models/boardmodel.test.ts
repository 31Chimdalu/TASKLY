import { boardModel } from '../../models/boardmodel';

describe('Board Model', () => {
    it('should create a new board', async () => {
        const board = await boardModel.create({ name: 'Test Board', organizationId: 'orgId' });
        expect(board).toHaveProperty('name', 'Test Board');
    });
});
