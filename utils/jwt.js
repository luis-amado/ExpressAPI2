import jwt from 'jsonwebtoken';
import { Router } from 'express';

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ message: 'Se require un token de autenticacion' });
    return;
  }

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: 'No se pudo verificar el token ingresado' });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
});
