import express from 'express';
import htmlExpress from 'html-express-js';
import path from 'path';

const __dirname = path.resolve();
const server = express();

server.engine('js', htmlExpress());
server.set('view engine', 'js');
server.set('views', path.join(__dirname, 'views'));
server.get('/', (req, res, next) => {
    res.render('index', { directory: 'recordings' });
});

server.use('/recordings', express.static(path.resolve(__dirname, 'recordings')));

server.listen(3000);