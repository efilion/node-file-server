import express from 'express';
import htmlExpress from 'html-express-js';
import path from 'path';
import { writeFile } from 'fs';

const __dirname = path.resolve();
const server = express();

server.engine('js', htmlExpress());
server.set('view engine', 'js');
server.set('views', path.join(__dirname, 'views'));

server.get('/', (req, res, next) => {
    res.render('index', { directory: 'recordings' });
});

server.use('/recordings', express.static(path.resolve(__dirname, 'recordings')));

server.use(express.raw({
    "type": ["audio/ogg"]
}));
server.post('/upload/:filename', (req, res, next) => {
    writeFile(path.join(__dirname, 'recordings', req.params.filename), req.body, { "encoding": "base64"}, err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`Successfully saved ${req.params.filename}`)
        }
    })
    res.sendStatus(200);
});

server.listen(3000);