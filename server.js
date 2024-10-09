import express from 'express';
import bodyParser from 'body-parser';
import librosRoutes from './router/librosRoutes.js';
import config from './config.js';

const app = express();
const port = config.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', librosRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
