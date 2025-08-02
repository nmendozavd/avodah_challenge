import { getCache, setCache } from "./cache.service";
import { CircuitBreaker } from "./circuitBreaker.service";


// Cache and Circuit Breaker configuration
const CACHE_TTL = 30_000; // 30 seconds
const breaker = new CircuitBreaker();

export async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  baseDelay: number = 500
): Promise<any> {

  const cached = getCache(url);

  if (cached) {
    return cached;
  };

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();

        setCache(url, data, CACHE_TTL);
        breaker.recordSuccess();
        return data;

      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (err) {
      if (attempt === maxRetries) {
        breaker.recordFailure();
        throw new Error(`Failed after ${attempt + 1} attempts: ${(err as Error).message}`);
      };
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    };
  };
};