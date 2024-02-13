import { html } from 'html-express-js';
import { readdirSync } from 'fs';

export const view = ({directory, path}) => html`
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
                ${ readdirSync(directory).map(entry =>
                    html`<li><a href="${path}/${entry}">${entry}</a></li>`
                )}
                </ul>
            </main>
        </body>
    </html>
`;