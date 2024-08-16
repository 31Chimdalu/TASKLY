# Taskly API

Taskly is a task management application that allows users to create and manage tasks within organizations. This API handles user authentication, task management, organization management, and notifications.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication and Authorization**: 
  - Users can register and log in.
  - Each user must belong to an organization.
  - Organizations can be created by users who act as owners.

- **Boards and Tasks**:
  - Organizations have boards to track various tasks.
  - Tasks can be assigned to users within the organization.
  - Tasks support priorities, labels, status, start date, due date, comments, descriptions, and attachments.
  - Tasks can be filtered by status, owner, priority, and labels.

- **Collaboration**:
  - Owners and users can invite others to join their boards.

- **Notifications**:
  - Users receive notifications when they are assigned tasks, when due dates are approaching, and when comments are added to tasks.

- **Analytics**:
  - Weekly reports for organization owners on the number of tasks completed, pending, and the average time to complete tasks.

## Tech Stack

- **Node.js** (with TypeScript)
- **Express.js**: Web framework for building APIs.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Password hashing.
- **Nodemailer**: Sending emails for notifications and reports.
- **Node-Schedule**: Scheduling jobs for periodic tasks like report generation.

## Project Structure

```plaintext
project-root/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── images/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── app.js
│   │   └── api.js
│   └── tests/
│       └── app.test.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.ts
│   │   ├── controllers/
│   │   │   └── authController.ts
│   │   │   └── boardController.ts
│   │   │   └── taskController.ts
│   │   │   └── organizationController.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   │   └── boardService.ts
│   │   │   └── taskService.ts
│   │   │   └── organizationService.ts
│   │   │   └── notificationService.ts
│   │   ├── models/
│   │   │   └── userModel.ts
│   │   │   └── boardModel.ts
│   │   │   └── taskModel.ts
│   │   │   └── organizationModel.ts
│   │   │   └── notificationModel.ts
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   │   └── boardRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   │   └── organizationRoutes.ts
│   │   ├── middlewares/
│   │   │   └── authMiddleware.ts
│   │   │   └── rateLimitMiddleware.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   │   └── cache.ts
│   │   ├── tests/
│   │   │   ├── controllers/
│   │   │   │   └── authController.test.ts
│   │   │   │   └── boardController.test.ts
│   │   │   │   └── taskController.test.ts
│   │   │   │   └── organizationController.test.ts
│   │   │   ├── services/
│   │   │   │   └── authService.test.ts
│   │   │   │   └── boardService.test.ts
│   │   │   │   └── taskService.test.ts
│   │   │   │   └── organizationService.test.ts
│   │   │   └── models/
│   │   │   │   └── userModel.test.ts
│   │   │   │   └── boardModel.test.ts
│   │   │   │   └── taskModel.test.ts
│   │   │   │   └── organizationModel.test.ts
│   │   │   ├── utils/
│   │   │       └── logger.test.ts
│   │   ├── typings/
│   │   │   └── custom.d.ts
│   │   ├── index.ts
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
└── openapi/
    └── api.yaml
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/31Chimdalu/taskly.git
   cd taskly
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/taskly

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Email configuration (for nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Other configurations
PORT=4000
```

## Usage

### Start the Backend

```bash
cd backend
npm run dev
```

### Start the Frontend

```bash
cd frontend
npm start
```

### API Documentation

The API is documented using OpenAPI (Swagger). You can access the documentation by running the server and navigating to `/api-docs`.

### Testing

1. **Run Backend Tests**:
   ```bash
   cd backend
   npm test
   ```

2. **Run Frontend Tests**:
   ```bash
   cd frontend
   npm test
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.