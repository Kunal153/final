import { app } from './api/index.ts';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EngiNotes server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
