import { createServer as createViteServer } from 'vite';
import express from 'express';
import { fileURLToPath } from 'url';
import { join, resolve, dirname } from 'path';
import ReactDomServer from 'react-dom/server';

import { App } from './components/App/App';

export async function createServer() {
  const app = express();
  const port = process.env.PORT || 3333;
  const publicFolder = join(dirname(fileURLToPath(import.meta.url)), 'public');
  const { default: manifest } = await import(`${publicFolder}/manifest.json`, {
    assert: {
      type: 'json',
    },
  });

  app.use('/public', express.static(publicFolder));
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to webstreaming!' });
  });

  app.use(async (req, res) => {
    const data = { test: 'one' };
    const stream = ReactDomServer.renderToPipeableStream(
      <App manifest={manifest} />,
      {
        bootstrapModules: ['./public/client.js'],
        bootstrapScriptContent: `window.assetMap = ${JSON.stringify(data)};`,
        onShellReady() {
          res.setHeader('content-type', 'text/html');
          stream.pipe(res);
        },
      }
    );
  });

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
}

createServer();
