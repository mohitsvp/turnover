import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// require('dotenv').config()

interface User {
  id : number;
  name : string;
  email : string
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const JWT_SECRET = process.env.JWT_SECRET_KEY ?? "turnover";

export const generateToken = (user : User) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
