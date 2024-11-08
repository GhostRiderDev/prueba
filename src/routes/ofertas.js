import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { body } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Oferta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la oferta
 *         documentos:
 *           type: array
 *           items:
 *             type: object
 *           description: Lista de documentos asociados
 *         hipoteca:
 *           type: object
 *           description: Detalles de la hipoteca asociada
 */

/**
 * @swagger
 * tags:
 *   name: Ofertas
 *   description: API para gestionar ofertas
 */

/**
 * @swagger
 * /api/ofertas/{id}:
 *   get:
 *     summary: Obtiene una oferta por ID
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la oferta
 *     responses:
 *       200:
 *         description: Oferta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Oferta'
 *       404:
 *         description: Oferta no encontrada
 *       500:
 *         description: Error al obtener la oferta
 */
router.get("/:id", async (req, res) => {
  try {
    const oferta = await prisma.oferta.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { documentos: true, hipoteca: true },
    });
    if (!oferta) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }
    res.json(oferta);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la oferta" });
  }
});

/**
 * @swagger
 * /api/ofertas:
 *   post:
 *     summary: Crea una nueva oferta
 *     tags: [Ofertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la oferta
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la oferta
 *     responses:
 *       201:
 *         description: Oferta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Oferta'
 *       500:
 *         description: Error al crear la oferta
 */
router.post(
  "/",
  [body("nombre").isString(), body("descripcion").isString()],
  async (req, res) => {
    try {
      const oferta = await prisma.oferta.create({
        data: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
        },
      });
      res.status(201).json(oferta);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la oferta" });
    }
  }
);

export { router };
