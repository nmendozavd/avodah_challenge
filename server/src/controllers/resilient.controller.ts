import { Request, Response } from "express";
import { fetchWithRetry } from "../services/resilient.service.js";

export const getResilientData = async (req: Request, res: Response) => {
  const url = "http://localhost:3000/"; 

  try {
    const data = await fetchWithRetry(url);
    res.status(200).json({ 
      success: true, 
      data });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
}