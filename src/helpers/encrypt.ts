import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const { CRYPTO_SECRET = 'superSecret' } = process.env;

const encrypt = (payload: string): string => (
  CryptoJS.AES.encrypt(payload, CRYPTO_SECRET).toString()
);

export default encrypt;
