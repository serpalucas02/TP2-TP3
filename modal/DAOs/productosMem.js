import fs from 'fs';

class ModelMem {
    constructor() {
        this.productos = [];
        this.#cargarProductosDesdeArchivo();
    }

    // Método privado para cargar productos desde el archivo productos.json
    #cargarProductosDesdeArchivo = () => {
        try {
            const productosArchivo = fs.readFileSync('productos.json', 'utf-8');
            this.productos = JSON.parse(productosArchivo);
        } catch (error) {
            console.error('Error al cargar productos desde el archivo, iniciando con productos vacíos.', error);
            this.productos = [];
        }
    }

    obtenerProductos = async () => this.productos;

    obtenerProducto = async id => {
        const producto = this.productos.find(p => p.id === id);
        return producto || {};
    }

    guardarProducto = async producto => {
        producto.id = String(parseInt(this.productos[this.productos.length - 1]?.id || 0) + 1);
        producto.stock = parseInt(producto.stock);
        producto.precio = +producto.precio;

        this.productos.push(producto);
        return producto;
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id;

        const index = this.productos.findIndex(p => p.id === id);
        if (index !== -1) {
            const productoAnt = this.productos[index];
            const productoAct = { ...productoAnt, ...producto };
            this.productos.splice(index, 1, productoAct);

            return productoAct;
        } else {
            return {};
        }
    }

    borrarProducto = async id => {
        let producto = {};

        const index = this.productos.findIndex(p => p.id === id);
        if (index !== -1) {
            producto = this.productos.splice(index, 1)[0];
        }

        return producto;
    }
}

export default ModelMem;
