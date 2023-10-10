import fs from 'fs';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import config from '../package.json' assert {type: 'json'};

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/';
const {name, version, description, author, repository} = config;

const generateHomePage = () => {
  fs.writeFileSync(
    __dirname + '../public/index.html',
    `
<html DOCTYPE!>
  <head>
    <title>${name} - ${description}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-weight: 300;
      }

      body {
        padding: 0px;
        margin: 0px;
        min-height: 100vh;
        font-family: 'IBM Plex Mono', Menlo, 'DejaVu Sans Mono',
          'Bitstream Vera Sans Mono', Courier, monospace;
        font-weight: 300;
        line-height: 1.4;
        background-color: rgba(1, 24, 6, 0.8);
        color: rgba(204, 204, 204, 0.8);
      }

      main,
      nav,
      header,
      footer {
        padding: 1rem;
      }

      a:link,
      a:hover,
      a:active,
      a:focus,
      a:visited {
        color: rgb(204, 204, 204);
      }

      nav ul li {
        margin-left: 2rem;
      }

      footer ul li {
        display: inline;
      }
    </style>
  </head>

  <body>
    <header>
      <h1 data-testid="name">${name}</h1>
      <h2 data-testid="version">Version: ${version}</h2>
    </header>
    <nav>
      <h1 data-testid="documentation">Documentation</h1>
      <ul>
        <li><a data-testid="redoc" href="/redoc">Redoc</a></li>
        <li><a data-testid="swagger" href="/swagger">Swagger</a></li>
      </ul>
    </nav>
    <main>
        <p data-testid="description">${description}</p>
    </main>
    <footer>
      <ul>
        <li><a data-testid="repository" href="${repository.url}">${repository.type}</a></li>
        <li><a data-testid="author" href="${author.url}">${author.name}</a></li>
      </ul>
    </footer>
  </body>
</html>
  `,
  );

  console.info('Generate public/index.html');
};

generateHomePage();
