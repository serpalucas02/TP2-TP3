import fs from 'fs';

class ModelFile {
    #nombreArchivo = null;

    constructor(file) {
        this.#nombreArchivo = file;
        this.#inicializarArchivo();  // Asegurarse de que el archivo existe
    }

    #inicializarArchivo = async () => {
        try {
            // Si el archivo no existe, lo creamos con un array vacío
            if (!fs.existsSync(this.#nombreArchivo)) {
                await this.#escribirArchivo([]);
            }
        } catch (error) {
            console.error('Error inicializando el archivo:', error);
        }
    }

    #leerArchivo = async () => {
        let productos = [];
        try {
            productos = JSON.parse(await fs.promises.readFile(this.#nombreArchivo, 'utf-8'));
        } catch (error) {
            console.error('Error leyendo archivo:', error);
        }
        return productos;
    }

    #escribirArchivo = async productos => {
        try {
            await fs.promises.writeFile(this.#nombreArchivo, JSON.stringify(productos, null, '\t'));
        } catch (error) {
            console.error('Error escribiendo archivo:', error);
        }
    }

    obtenerProductos = async () => await this.#leerArchivo();

    obtenerProducto = async id => {
        const productos = await this.#leerArchivo();
        const producto = productos.find(p => p.id === id);
        return producto || {};
    }

    guardarProducto = async producto => {
        const productos = await this.#leerArchivo();
        producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1);
        producto.stock = parseInt(producto.stock);
        producto.precio = +producto.precio;

        productos.push(producto);
        await this.#escribirArchivo(productos);

        return producto;
    }

    actualizarProducto = async (id, producto) => {
        const productos = await this.#leerArchivo();
        producto.id = id;

        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            const productoAnt = productos[index];
            const productoAct = { ...productoAnt, ...producto };
            productos.splice(index, 1, productoAct);
            await this.#escribirArchivo(productos);

            return productoAct;
        } else {
            return {};
        }
    }

    borrarProducto = async id => {
        const productos = await this.#leerArchivo();
        let producto = {};

        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            producto = productos.splice(index, 1)[0];
            await this.#escribirArchivo(productos);
        }

        return producto;
    }
}

export default ModelFile;
