type CacheEntry = {
    data: any;
    expiresAt: number;
};

const cache: Record<string, CacheEntry> = {};

export function getCache(key: string): any | null {
    const entry = cache[key];

    if (entry && entry.expiresAt > Date.now()) {
        return entry.data;
    };
        return null;
};

export function setCache(key: string, data: any, ttlMs: number): void {
    cache[key] = {
        data,
        expiresAt: Date.now() + ttlMs,
    };
};