import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export const validateSignup = async(req: Request, res: Response, next: NextFunction) => {
  const { fullname, email, password, confirmPassword, gender, mobile } = req.body;
  const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z]).{8,}$/;
  const mobileRegex = /^[1-9][0-9]{9}$/;

  const existingUser = await User.findOne({ where: { email } });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body is missing.' });
  }

  if (!fullname || !email || !password || !confirmPassword || !gender || !mobile) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Confirmation password doesn't match." });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters, including uppercase, lowercase, and a special character.' });
  }

  if (!mobileRegex.test(mobile) || mobile === '0000000000') {
    return res.status(400).json({
      message: 'Invalid mobile number.',
    });
  }

  if(existingUser){
    return res.status(400).json({ message: 'Email is already registered.' });
  }

  next();
};
