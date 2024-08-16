import { boardModel } from '../models/boardmodel';
import { userModel } from '../models/usermodel';
import nodemailer from 'nodemailer';

export const boardService = {
    getBoards: async (organizationId: string) => {
        return await boardModel.find({ organizationId });
    },
    createBoard: async (organizationId: string, name: string) => {
        return await boardModel.create({ organizationId, name });
    },
    inviteUser: async (boardId: string, email: string) => {
      const user = await userModel.findOne({ email });
      if (!user) {
          throw new Error('User not found');
      }

      const board = await boardModel.findById(boardId);
      if (!board) {
          throw new Error('Board not found');
      }

      // Logic to send email invitation
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'You are invited to join a board',
          text: `You have been invited to join the board: ${board.name}. Click here to join: [link]`,
      };

      await transporter.sendMail(mailOptions);
  },
};