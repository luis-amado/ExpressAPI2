import crypto from 'crypto';

export const getSalt = () => {
  const salt = crypto
    .randomBytes(24)
    .toString('base64url')
    .slice(0, process.env.SALT_SIZE);
  return salt;
};

export const hashPassword = (password, salt) => {
  const pepperPassword = process.env.PEPPER + password;
  const saltedPassword = salt + pepperPassword;

  const hashing = crypto.createHash('sha512');
  const hash = hashing.update(saltedPassword).digest('base64url');

  return hash;
};
