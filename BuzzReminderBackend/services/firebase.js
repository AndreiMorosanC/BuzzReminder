import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error('No se encontró el archivo de credenciales de Firebase');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export default admin;
