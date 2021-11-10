import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

const port = process.env.PORT;

app.use(express.static('app'));

import { ghPagesProxy } from './gh-pages.js';

ghPagesProxy(app);

app.listen(port, () => {});
console.log(`Listening on port ${port}`);