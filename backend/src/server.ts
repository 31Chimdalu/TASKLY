import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authroutes';
import boardRoutes from './routes/boardroutes';
import taskRoutes from './routes/taskroutes';
import organizationRoutes from './routes/organizationroutes';
import notificationRoutes from './routes/notificationroutes';
import { config } from './config/config';
import { authMiddleware } from './middlewares/authMiddleware';
import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware';
import { organizationService } from './services/organizationservice';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(rateLimitMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', authMiddleware, boardRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/organizations', authMiddleware, organizationRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);

// Database connection
mongoose.connect(config.dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Schedule weekly reports
organizationService.scheduleWeeklyReports();

export default app;
