import ModelFactory from '../modal/DAOs/productosFactory.js';
import config from '../config.js';

const model = ModelFactory.get(config.MODO_PERSISTENCIA);

export async function obtenerProductos() {
    return await model.obtenerProductos();
}

export async function obtenerProductoPorId(id) {
    return await model.obtenerProducto(id);
}

export async function crearProducto(producto) {
    return await model.guardarProducto(producto);
}

export async function actualizarProducto(id, producto) {
    return await model.actualizarProducto(id, producto);
}

export async function borrarProducto(id) {
    return await model.borrarProducto(id);
}
