import { Request, Response } from "express";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../', '../', '.env') });

import express from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Community Clinic!');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});