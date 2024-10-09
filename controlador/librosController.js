import * as librosService from '../servicio/librosService.js';

export async function obtenerLibros(req, res) {
    const libros = await librosService.obtenerLibros();
    res.json(libros);
}

export async function obtenerLibroPorId(req, res) {
    const libro = await librosService.obtenerLibroPorId(req.params.id);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).send('Libro no encontrado');
    }
}

export async function crearLibro(req, res) {
    const { titulo, autor, año } = req.body;
    const nuevoLibro = await librosService.crearLibro({ titulo, autor, año });
    res.status(201).json(nuevoLibro);
}

export async function actualizarLibro(req, res) {
    const { titulo, autor, año } = req.body;
    const libroActualizado = await librosService.actualizarLibro(req.params.id, { titulo, autor, año });
    if (libroActualizado) {
        res.json(libroActualizado);
    } else {
        res.status(404).send('Libro no encontrado');
    }
}

export async function borrarLibro(req, res) {
    const resultado = await librosService.borrarLibro(req.params.id);
    if (resultado) {
        res.status(204).send();
    } else {
        res.status(404).send('Libro no encontrado');
    }
}
