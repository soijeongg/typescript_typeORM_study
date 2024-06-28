import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error:', err);
  console.log('res 객체 타입:', typeof res.status);
  if (typeof res.status === 'function') {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  } else {
    console.error('res.status는 함수가 아닙니다');
    res.end();
  }
};

export default errorHandler;
