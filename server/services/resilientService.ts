export async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  baseDelay: number = 500
): Promise<any> {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      };


      const data = await response.json();
      return data;
    } catch (err) {
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${attempt + 1} attempts: ${(err as Error).message}`);
      };
      const delay = baseDelay * Math.pow(2, attempt);
      console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    };
  };
};