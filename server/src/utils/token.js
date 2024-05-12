import jwt from 'jsonwebtoken';

const secret_key = process.env.JWT_SECRET || 'default_secret_key';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, secret_key, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret_key);
};
