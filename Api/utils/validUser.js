
import { errorHendeler } from './error.js';
import jwt from 'jsonwebtoken';

export const varifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(errorHendeler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHendeler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};