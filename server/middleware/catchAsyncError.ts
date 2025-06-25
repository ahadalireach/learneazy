import { Request, Response, NextFunction } from "express";

const catchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

export default catchAsyncError;
