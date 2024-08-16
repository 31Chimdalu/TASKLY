import { taskService } from '../../services/taskservice';

describe('Task Service', () => {
    it('should create a new task', async () => {
        const task = await taskService.createTask('boardId', {
            title: 'New Task',
            description: 'Task description'
        });
        expect(task).toHaveProperty('title', 'New Task');
    });

    it('should get tasks', async () => {
        const tasks = await taskService.getTasks('boardId', {});
        expect(tasks).toBeInstanceOf(Array);
    });
});
