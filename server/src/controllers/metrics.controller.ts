import { Request, Response } from "express";
import { metrics } from "../services/metrics.service";

export function getMetrics(req: Request, res: Response) {
    res.json({
        totalRequests: metrics.totalRequests,
        successCount: metrics.successCount,
        failureCount: metrics.failureCount,
        cacheHits: metrics.cacheHits,
        cacheHitRatio: metrics.getCacheHitRatio(),
    });
};