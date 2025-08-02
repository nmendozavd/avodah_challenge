export class CircuitBreaker {
    private failureCount = 0;
    private circuitOpen = false;
    private lastFailureTime = 0;

    constructor(
        private readonly failureThreshold = 5,
        private readonly cooldownTime = 30_000 // 30 seconds
    ) {}

    canRequest(): boolean {
        if (!this.circuitOpen) return true;

        const now = Date.now();
        if (now - this.lastFailureTime > this.cooldownTime) {
        this.reset();
        return true;
        }

        return false;
    }

    recordFailure(): void {
        this.failureCount++;
        if (this.failureCount >= this.failureThreshold) {
        this.trip();
        }
    }

    recordSuccess(): void {
        this.reset();
    }

    private trip(): void {
        this.circuitOpen = true;
        this.lastFailureTime = Date.now();
        console.warn("🚫 Circuit breaker TRIPPED");
    }

    private reset(): void {
        this.failureCount = 0;
        this.circuitOpen = false;
        console.info("✅ Circuit breaker RESET");
    }
}