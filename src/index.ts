import express from 'express';
import app from './app';
import dotenv from 'dotenv';
import { AppDataSource } from './dataSource';

dotenv.config();
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
