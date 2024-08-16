import { boardService } from '../../services/boardservice';

describe('Board Service', () => {
    it('should create a new board', async () => {
        const board = await boardService.createBoard('organizationId', 'New Board');
        expect(board).toHaveProperty('name', 'New Board');
    });

    it('should get boards', async () => {
        const boards = await boardService.getBoards('organizationId');
        expect(boards).toBeInstanceOf(Array);
    });
});
