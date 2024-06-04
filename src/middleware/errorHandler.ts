import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};

export default errorHandler;
