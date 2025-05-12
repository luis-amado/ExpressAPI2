import db from '../utils/firebase.js';
import { getSalt, hashPassword } from '../utils/hash.js';

export const getUsers = async (req, res) => {
  const users = await db.collection('users').get();
  const usersList = [];
  users.forEach((user) => {
    usersList.push({
      name: user.data().name,
      username: user.data().username,
      password: user.data().password,
    });
  });
  res.status(200).json(usersList);
};

export const postUser = async (req, res) => {
  const { name, username, password } = req.body;
  const salt = getSalt();
  const hash = hashPassword(password, salt);
  const storedPassword = salt + hash;
  await db.collection('users').doc(username).set({
    name,
    username,
    password: storedPassword,
  });
  res.status(200).json({
    operation: true,
    user: { name, username, password: storedPassword },
  });
};
