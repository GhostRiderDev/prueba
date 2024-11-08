import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { verificarDocumentos } from '../services/hipotecaService.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/',
  [
    body('ofertaId').isInt(),
    body('tipo').isString(),
    body('url').isURL(),
  ],
  async (req, res) => {
    try {
      const documento = await prisma.documento.create({
        data: {
          ofertaId: req.body.ofertaId,
          tipo: req.body.tipo,
          url: req.body.url,
          completado: true
        }
      });

      await verificarDocumentos(req.body.ofertaId);
      res.json(documento);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el documento' });
    }
});

export { router };