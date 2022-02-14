import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const { CRYPTO_SECRET } = process.env;

const decrypt = (encrypted: string): string => {
  const bytes = CryptoJS.AES.decrypt(encrypted, CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default decrypt;
