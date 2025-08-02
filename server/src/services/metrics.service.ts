export const metrics = {
    totalRequests: 0,
    successCount: 0,
    failureCount: 0,
    cacheHits: 0,

    logRetry(attempt: number) {
        console.log(`🔁 Retry attempt ${attempt}`);
    },

    logCacheHit(url: string) {
        console.log(`⚡ Cache hit for: ${url}`);
        this.cacheHits++;
    },

    logSuccess() {
        this.successCount++;
    },

    logFailure() {
        this.failureCount++;
    },

    logRequest() {
        this.totalRequests++;
    },

    getCacheHitRatio() {
        const hits = this.cacheHits;
        const total = this.totalRequests;
        return total === 0 ? 0 : (hits / total).toFixed(2);
    },
};