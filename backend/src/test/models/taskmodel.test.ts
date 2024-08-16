import { taskModel } from '../../models/taskmodel';

describe('Task Model', () => {
    it('should create a new task', async () => {
        const task = await taskModel.create({ title: 'Test Task', boardId: 'boardId' });
        expect(task).toHaveProperty('title', 'Test Task');
    });
});
