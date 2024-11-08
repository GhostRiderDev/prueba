import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { router as ofertasRouter } from "./routes/ofertas.js";
import { router as documentosRouter } from "./routes/documentos.js";
import { router as hipotecasRouter } from "./routes/hipotecas.js";
import { setupLogger } from "./utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./cfg/swagger.js";

const app = express();
const prisma = new PrismaClient();
const logger = setupLogger();

app.use(cors());
app.use(express.json());

app.use("/api/ofertas", ofertasRouter);
app.use("/api/documentos", documentosRouter);
app.use("/api/hipotecas", hipotecasRouter);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
