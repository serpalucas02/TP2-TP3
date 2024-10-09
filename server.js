import express from 'express';
import bodyParser from 'body-parser';
import productosRoutes from './router/productosRoutes.js';
import config from './config.js';

const app = express();
const port = config.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', productosRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
