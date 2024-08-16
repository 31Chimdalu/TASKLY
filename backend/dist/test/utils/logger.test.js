"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../utils/logger");
describe('Logger Utility', () => {
    it('should log messages without errors', () => {
        expect(() => logger_1.logger.info('Info log')).not.toThrow();
        expect(() => logger_1.logger.error('Error log')).not.toThrow();
    });
});
