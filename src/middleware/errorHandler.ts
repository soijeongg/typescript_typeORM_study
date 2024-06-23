import { Request, Response } from 'express';

const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};

export default errorHandler;
