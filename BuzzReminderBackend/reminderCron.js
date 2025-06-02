// reminderCron.js
import cron from 'node-cron';
import Task from './models/Task.js';
import { sendEmail } from './emailService.js';

const startReminderService = () => {
  // Ejecuta cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    console.log('⏰ Buscando tareas próximas para enviar recordatorios...');

    const now = new Date();

    try {
      // Busca tareas con reminder pendiente
      const tasks = await Task.find({
        reminderSent: false,
        startDate: { $gte: now }, // tareas futuras
      });

      for (const task of tasks) {
        const reminderTime = new Date(task.startDate.getTime() - task.reminderOffsetMinutes * 60000);

        // Si ya es hora de recordar
        if (now >= reminderTime) {
          await sendEmail(
            task.email,
            `⏰ Recordatorio: ${task.title}`,
            `Tienes la tarea "${task.title}" programada para las ${task.startDate.toLocaleString()}.`,
            `<strong>Tarea:</strong> ${task.title}<br><strong>Inicio:</strong> ${task.startDate.toLocaleString()}`
          );

          // Marcar como enviado
          task.reminderSent = true;
          await task.save();
          console.log(`📨 Correo enviado para tarea: ${task.title}`);
        }
      }
    } catch (error) {
      console.error('❌ Error al procesar recordatorios:', error.message);
    }
  });
};

export default startReminderService;
