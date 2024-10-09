import ModelFile from './librosFile.js';
import ModelMem from './librosMem.js';

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('*** Persistencia en Memoria ***');
                return new ModelMem();
            case 'FILE':
                console.log('*** Persistencia en Archivo ***');
                return new ModelFile('libros.json');
            default:
                console.log('*** Persistencia en Memoria (default) ***');
                return new ModelMem();
        }
    }
}

export default ModelFactory;
