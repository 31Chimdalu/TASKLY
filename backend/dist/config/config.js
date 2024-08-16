"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: process.env.PORT || 8000,
    dbUri: process.env.DB_URI || 'mongodb+srv://akaboguchimdalu:chimdalu2003@cluster101.nty8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster101',
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
    emailServiceApiKey: process.env.EMAIL_SERVICE_API_KEY || 'your-email-service-api-key'
};
