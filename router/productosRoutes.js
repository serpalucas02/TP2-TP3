import express from 'express';
import * as productosController from '../controlador/productosController.js';

const router = express.Router();

router.get('/productos', productosController.obtenerProductos);
router.get('/productos/:id', productosController.obtenerProductoPorId);
router.post('/productos', productosController.crearProducto);
router.put('/productos/:id', productosController.actualizarProducto);
router.delete('/productos/:id', productosController.borrarProducto);

export default router;
