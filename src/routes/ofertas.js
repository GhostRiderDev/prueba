import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

router.post('/',
  [
    body('clienteId').isInt(),
    body('monto').isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const oferta = await prisma.oferta.create({
        data: {
          clienteId: req.body.clienteId,
          monto: req.body.monto,
          estado: 'PENDIENTE'
        }
      });
      res.json(oferta);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la oferta' });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const oferta = await prisma.oferta.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { documentos: true, hipoteca: true }
    });
    if (!oferta) {
      return res.status(404).json({ error: 'Oferta no encontrada' });
    }
    res.json(oferta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la oferta' });
  }
});

export { router };