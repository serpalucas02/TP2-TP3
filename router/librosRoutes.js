import express from 'express';
import * as librosController from '../controlador/librosController.js';

const router = express.Router();

router.get('/libros', librosController.obtenerLibros);
router.get('/libros/:id', librosController.obtenerLibroPorId);
router.post('/libros', librosController.crearLibro);
router.put('/libros/:id', librosController.actualizarLibro);
router.delete('/libros/:id', librosController.borrarLibro);

export default router;
