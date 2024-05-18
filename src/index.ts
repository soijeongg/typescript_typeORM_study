import express from 'express';
import app from './app';
import * as dotenv from 'dotenv'
import { AppDataSource } from './dataSource';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
