import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

const prisma = new PrismaClient();

export async function verificarDocumentos(ofertaId) {
  try {
    const oferta = await prisma.oferta.findUnique({
      where: { id: ofertaId },
      include: { documentos: true }
    });

    if (!oferta) {
      throw new Error('Oferta no encontrada');
    }

    const todosCompletados = oferta.documentos.every(doc => doc.completado);

    if (todosCompletados) {
      await prisma.hipoteca.create({
        data: {
          ofertaId: oferta.id,
          montoInicial: oferta.monto,
          tasaInteres: 0.05, // 5% tasa ejemplo
          estado: 'ACTIVA'
        }
      });

      await prisma.oferta.update({
        where: { id: oferta.id },
        data: { estado: 'ACEPTADA' }
      });

      logger.info(`Hipoteca creada para la oferta ${ofertaId}`);
    }
  } catch (error) {
    logger.error(`Error al procesar documentos: ${error.message}`);
    throw error;
  }
}