import { Request, Response } from "express";

import express from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Community Clinic!');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});