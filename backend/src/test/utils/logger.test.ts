import { logger } from '../../utils/logger';

describe('Logger Utility', () => {
    it('should log messages without errors', () => {
        expect(() => logger.info('Info log')).not.toThrow();
        expect(() => logger.error('Error log')).not.toThrow();
    });
});
