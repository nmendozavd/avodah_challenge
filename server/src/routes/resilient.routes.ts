import express from "express";
import { getResilientData } from "../controllers/resilient.controller";

const router = express.Router();

router.get("/resilient-consumer", getResilientData);

export default router;