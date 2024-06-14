import { Request, Response } from "express";

export const healthcheck = async (req: Request, res: Response) => {
  res.json({
    message: "Server running properly...",
    success: true,
  });
};
