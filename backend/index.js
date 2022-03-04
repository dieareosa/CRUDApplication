require('dotenv/config');
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middlewares/error');
const tutorials = require('./routes/tutorials');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));


app.get('/ping', (req, res) => res.send('pong'));

app.use('/tutorials', tutorials);

app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log('CRUD APPLICATION SERVER LISTENING ON ' + SERVER_PORT.toString()));
