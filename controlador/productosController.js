import * as productosService from '../servicio/productosService.js';

// Obtener todos los productos
export async function obtenerProductos(req, res) {
    const productos = await productosService.obtenerProductos();
    res.json(productos);
}

// Obtener un producto por ID
export async function obtenerProductoPorId(req, res) {
    const producto = await productosService.obtenerProductoPorId(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
}

// Crear un nuevo producto
export async function crearProducto(req, res) {
    const { nombre, precio, stock } = req.body;
    const nuevoProducto = await productosService.crearProducto({ nombre, precio, stock });
    res.status(201).json(nuevoProducto);
}

// Actualizar un producto por ID
export async function actualizarProducto(req, res) {
    const { nombre, precio, stock } = req.body;
    const productoActualizado = await productosService.actualizarProducto(req.params.id, { nombre, precio, stock });
    if (productoActualizado) {
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
}

// Borrar un producto por ID
export async function borrarProducto(req, res) {
    const resultado = await productosService.borrarProducto(req.params.id);
    if (resultado) {
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado');
    }
}
