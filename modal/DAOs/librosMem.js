class ModelMem {
    constructor() {
        this.libros = [
            { id: '1', titulo: 'El Quijote', autor: 'Miguel de Cervantes', año: 1605 },
            { id: '2', titulo: '1984', autor: 'George Orwell', año: 1949 },
            { id: '3', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', año: 1967 },
        ];
    }

    obtenerLibros = async () => this.libros;

    obtenerLibro = async id => {
        const libro = this.libros.find(l => l.id === id);
        return libro || {};
    }

    guardarLibro = async libro => {
        libro.id = String(parseInt(this.libros[this.libros.length - 1]?.id || 0) + 1);
        libro.año = parseInt(libro.año);
        this.libros.push(libro);
        return libro;
    }

    actualizarLibro = async (id, libro) => {
        libro.id = id;
        const index = this.libros.findIndex(l => l.id === id);
        if (index !== -1) {
            const libroAnt = this.libros[index];
            const libroAct = { ...libroAnt, ...libro };
            this.libros.splice(index, 1, libroAct);
            return libroAct;
        } else {
            return {};
        }
    }

    borrarLibro = async id => {
        let libro = {};
        const index = this.libros.findIndex(l => l.id === id);
        if (index !== -1) {
            libro = this.libros.splice(index, 1)[0];
        }
        return libro;
    }
}

export default ModelMem;
