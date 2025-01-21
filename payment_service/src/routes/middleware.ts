import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils/broker";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("RequestAuthorizer called", req.headers.authorization);
  try {
    if (!req.headers.authorization) {
      res
        .status(403)
        .json({ error: "Unauthorized due to authrization token missing!" });
    }
    const userData = await ValidateUser(req.headers.authorization as string);
    req.user = userData;
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
};
