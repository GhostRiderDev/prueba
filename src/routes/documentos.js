import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { body } from "express-validator";
import { verificarDocumentos } from "../services/hipotecaService.js";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Documento:
 *       type: object
 *       required:
 *         - ofertaId
 *         - tipo
 *         - url
 *       properties:
 *         ofertaId:
 *           type: integer
 *           description: ID de la oferta
 *         tipo:
 *           type: string
 *           description: Tipo de documento
 *         url:
 *           type: string
 *           format: url
 *           description: URL del documento
 *         completado:
 *           type: boolean
 *           description: Estado de completado del documento
 */

/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: API para gestionar documentos
 */

/**
 * @swagger
 * /api/documentos:
 *   post:
 *     summary: Crea un nuevo documento
 *     tags: [Documentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Documento'
 *     responses:
 *       200:
 *         description: Documento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Documento'
 *       500:
 *         description: Error al crear el documento
 */
router.post(
  "/",
  [body("ofertaId").isInt(), body("tipo").isString(), body("url").isURL()],
  async (req, res) => {
    try {
      console.log("Haz pasado por aquí (antes)");
      const documento = await prisma.documento.create({
        data: {
          ofertaId: req.body.ofertaId,
          tipo: req.body.tipo,
          url: req.body.url,
          completado: true,
        },
      });

      await verificarDocumentos(req.body.ofertaId);
      res.json(documento);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el documento" });
      console.log(error);
    }
  }
);

export { router };
