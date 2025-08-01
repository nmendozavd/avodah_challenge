import { Request, Response } from "express";

type HomeResponse = {
    message: string;
};

export const getRoot = (req: Request, res: Response) => {
  // utilize random number to generate between 0 and 1
    let randomNum = Math.random();
    // if num is equal or less than .60
    if (randomNum <= .60) {
        res.json({
            message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
        });
    // otherise send a 500 
    } else {
        res.status (500).json({
            message: "500 Internal Server Error"
        })
    }
};