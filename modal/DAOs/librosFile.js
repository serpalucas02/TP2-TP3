import fs from 'fs';

class ModelFile {
    #nombreArchivo = null;

    constructor(file) {
        this.#nombreArchivo = file;
        this.#inicializarArchivo();
    }

    #inicializarArchivo = async () => {
        try {
            if (!fs.existsSync(this.#nombreArchivo)) {
                await this.#escribirArchivo([]);
            }
        } catch (error) {
            console.error('Error inicializando el archivo:', error);
        }
    }

    #leerArchivo = async () => {
        let libros = [];
        try {
            libros = JSON.parse(await fs.promises.readFile(this.#nombreArchivo, 'utf-8'));
        } catch (error) {
            console.error('Error leyendo archivo:', error);
        }
        return libros;
    }

    #escribirArchivo = async libros => {
        try {
            await fs.promises.writeFile(this.#nombreArchivo, JSON.stringify(libros, null, '\t'));
        } catch (error) {
            console.error('Error escribiendo archivo:', error);
        }
    }

    obtenerLibros = async () => await this.#leerArchivo();

    obtenerLibro = async id => {
        const libros = await this.#leerArchivo();
        const libro = libros.find(l => l.id === id);
        return libro || {};
    }

    guardarLibro = async libro => {
        const libros = await this.#leerArchivo();
        libro.id = String(parseInt(libros[libros.length - 1]?.id || 0) + 1);
        libro.año = parseInt(libro.año);

        libros.push(libro);
        await this.#escribirArchivo(libros);

        return libro;
    }

    actualizarLibro = async (id, libro) => {
        const libros = await this.#leerArchivo();
        libro.id = id;

        const index = libros.findIndex(l => l.id === id);
        if (index !== -1) {
            const libroAnt = libros[index];
            const libroAct = { ...libroAnt, ...libro };
            libros.splice(index, 1, libroAct);
            await this.#escribirArchivo(libros);

            return libroAct;
        } else {
            return {};
        }
    }

    borrarLibro = async id => {
        const libros = await this.#leerArchivo();
        let libro = {};

        const index = libros.findIndex(l => l.id === id);
        if (index !== -1) {
            libro = libros.splice(index, 1)[0];
            await this.#escribirArchivo(libros);
        }

        return libro;
    }
}

export default ModelFile;
