import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const hostname = process.env['HOSTNAME'] || '0.0.0.0';
const port = parseInt(process.env['PORT'] || '3000');

export class App {
  start() {
    const app = express();
    app.listen(port, hostname, () => {
      console.log(`Started`);
    });
  }
}
