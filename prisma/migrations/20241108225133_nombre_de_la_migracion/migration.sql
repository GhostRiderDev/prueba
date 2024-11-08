-- CreateTable
CREATE TABLE "Oferta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "monto" REAL NOT NULL,
    "estado" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ofertaId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fechaSubida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Documento_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "Oferta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hipoteca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ofertaId" INTEGER NOT NULL,
    "montoInicial" REAL NOT NULL,
    "tasaInteres" REAL NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Hipoteca_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "Oferta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hipoteca_ofertaId_key" ON "Hipoteca"("ofertaId");
