import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Ruta de usuarios funcionando' });

});

export default router;
