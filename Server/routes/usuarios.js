const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/api/registro", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  console.log("🟢 Registro recibido:", { nombre, correo, contrasena });

  // Aquí podrías validar si ya existe el correo, guardar en base de datos, etc.

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({
      success: false,
      mensaje: "Todos los campos son obligatorios"
    });
  }

  // Simulación de éxito
  return res.json({
    success: true,
    mensaje: "Usuario registrado correctamente"
  });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
