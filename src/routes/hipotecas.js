import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
  try {
    const hipoteca = await prisma.hipoteca.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { oferta: true }
    });
    if (!hipoteca) {
      return res.status(404).json({ error: 'Hipoteca no encontrada' });
    }
    res.json(hipoteca);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la hipoteca' });
  }
});

export { router };