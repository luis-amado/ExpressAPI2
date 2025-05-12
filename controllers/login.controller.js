import db from '../utils/firebase.js';
import jwt from 'jsonwebtoken';
import { getSalt, hashPassword } from '../utils/hash.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.collection('users').doc(username).get();

  if (!user.exists) {
    return res.json({ isLogin: false, user: {} });
  }

  const storedPassword = user?.data().password;
  const salt = storedPassword.slice(0, process.env.SALT_SIZE);

  const hash = hashPassword(password, salt);

  const isLogin = storedPassword === salt + hash;
  if (isLogin) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ isLogin, user: user.data(), token });
  } else {
    res.status(400).json({ isLogin, user: null });
  }
};

export const register = async (req, res) => {
  const { username, password, name } = req.body;

  const salt = getSalt();
  const hash = hashPassword(password, salt);

  const storedPassword = salt + hash;

  await db.collection('users').doc(username).set({
    name,
    username,
    password: storedPassword,
  });

  res.status(200).json({ message: 'Created user' });
};
