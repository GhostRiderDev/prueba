import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hipoteca:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la hipoteca
 *         oferta:
 *           type: object
 *           description: Detalles de la oferta asociada
 */

/**
 * @swagger
 * tags:
 *   name: Hipotecas
 *   description: API para gestionar hipotecas
 */

/**
 * @swagger
 * /api/hipotecas/{id}:
 *   get:
 *     summary: Obtiene una hipoteca por ID
 *     tags: [Hipotecas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la hipoteca
 *     responses:
 *       200:
 *         description: Hipoteca obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hipoteca'
 *       404:
 *         description: Hipoteca no encontrada
 *       500:
 *         description: Error al obtener la hipoteca
 */
router.get("/:id", async (req, res) => {
  try {
    const hipoteca = await prisma.hipoteca.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { oferta: true },
    });
    if (!hipoteca) {
      return res.status(404).json({ error: "Hipoteca no encontrada" });
    }
    res.json(hipoteca);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la hipoteca" });
  }
});

export { router };
