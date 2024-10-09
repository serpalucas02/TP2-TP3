import ModelFactory from '../modal/DAOs/librosFactory.js';
import config from '../config.js';

const model = ModelFactory.get(config.MODO_PERSISTENCIA);

export async function obtenerLibros() {
    return await model.obtenerLibros();
}

export async function obtenerLibroPorId(id) {
    return await model.obtenerLibro(id);
}

export async function crearLibro(libro) {
    return await model.guardarLibro(libro);
}

export async function actualizarLibro(id, libro) {
    return await model.actualizarLibro(id, libro);
}

export async function borrarLibro(id) {
    return await model.borrarLibro(id);
}
