const express = require("express");
const app = express();
const db = require('./db');
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Endpoint para guardar una simulación
app.post("/simulaciones", async (req, res) => {
  const { usuario_id, ingreso, meta, ahorro_mensual } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO simulaciones (usuario_id, ingreso, meta, ahorro_mensual) VALUES (?, ?, ?, ?)",
      [usuario_id, ingreso, meta, ahorro_mensual]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener las simulaciones de un usuario
app.get("/simulaciones/:usuario_id", async (req, res) => {
  const usuario_id = req.params.usuario_id;

  try {
    const [simulaciones] = await db.execute(
      "SELECT * FROM simulaciones WHERE usuario_id = ?",
      [usuario_id]
    );
    res.json(simulaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
