// routes/report.js
const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Ruta para guardar un reporte
router.post('/save-report', async (req, res) => {
  try {
    const { title, contenido } = req.body;
    
    // Crear un nuevo reporte en la base de datos
    const newReport = new Report({ title, contenido });
    await newReport.save();

    return res.status(201).json({ message: 'Reporte guardado con éxito', report: newReport });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al guardar el reporte' });
  }
});

module.exports = router;
