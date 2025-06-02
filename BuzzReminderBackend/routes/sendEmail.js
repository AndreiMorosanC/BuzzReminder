import express from 'express';
import { sendEmail } from '../emailService.js'; // Asegúrate que esta ruta sea correcta

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text, `<p>${text}</p>`);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
