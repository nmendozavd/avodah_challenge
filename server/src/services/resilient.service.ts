type CacheEntry = {
  data: any;
  expiresAt: number;
};

const cache: Record<string, CacheEntry> = {};

export async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  baseDelay: number = 500
): Promise<any> {
  const now = Date.now();

  if (cache[url] && cache[url].expiresAt > now) {
    return cache[url].data;
  }

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();

        cache[url] = {
          data,
          expiresAt: now + 30_000, // 30 seconds
        };

        return data;
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (err) {
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${attempt + 1} attempts: ${(err as Error).message}`);
      };
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    };
  };
};