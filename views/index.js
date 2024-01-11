import { html } from 'html-express-js';
import path from 'path';
import { readdirSync } from 'fs';

const __dirname = path.resolve();

export const view = ({directory}) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>${directory} Index</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
        </head>
        <body>
            <main>
                <h1>${directory}</h1>
                <ul>
                ${ readdirSync(path.join(__dirname, directory)).map(entry =>
                    html`<li><a href="${directory}/${entry}">${entry}</a></li>`
                )}
                </ul>
            </main>
        </body>
    </html>
`;