import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("correo enviado");
  } catch (error) {
    console.error(
      "Error al enviar correo:",
      error.response?.body || error.message
    );
    throw new Error("Error al enviar correo");
  }
  console.log("Enviando correo a:", to);
console.log("Desde:", process.env.FROM_EMAIL);

};
