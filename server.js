import express from 'express';
import htmlExpress from 'html-express-js';
import path from 'path';
import { writeFile } from 'fs';

const __dirname = path.resolve();
const server = express();
const recording_dir = path.resolve(process.env.RECORDING_DIR);

server.engine('js', htmlExpress());
server.set('view engine', 'js');
server.set('views', path.join(__dirname, 'views'));

server.get('/', (req, res, next) => {
    res.render('index', { directory: recording_dir, path: 'recordings'});
});

server.use('/recordings', express.static(recording_dir));

server.use(express.raw({
    "type": ["audio/ogg"]
}));
server.post('/upload/:filename', (req, res, next) => {
    writeFile(path.join(recording_dir, req.params.filename), req.body, { "encoding": "base64"}, err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`Successfully saved ${req.params.filename}`)
        }
    })
    res.sendStatus(200);
});

server.listen(process.env.PORT);