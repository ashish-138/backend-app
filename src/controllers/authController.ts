import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, comparePassword, generateToken } from '../utils/authUtils';
import { successResponse, errorResponse } from '../utils/responseHandler';
import { UniqueConstraintError } from 'sequelize';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, gender, mobile } = req.body;
    
    if (!fullname || !email || !password || !gender || !mobile) {
      return errorResponse(res, null, 'All fields are required', 400);
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      gender,
      mobile,
    });

    const token = generateToken({ id: user.id, email: user.email });
    return successResponse(res, { token }, 'User registered successfully.', 201);
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      return errorResponse(res, error, 'Email is already exists.', 400);
    }

    return errorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, null, 'Both email and password are required.', 400);
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      return errorResponse(res, null, 'Invalid credentials.', 401);
    }

    const token = generateToken({ id: user.id, email: user.email });
    return successResponse(res, { token }, 'Login successful.');
  } catch (error: any) {
    return errorResponse(res, error);
  }
};
