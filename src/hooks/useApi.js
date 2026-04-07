import { requestWithRetry } from "../api/greenApi";
import { rateLimit } from "../utils/rateLimiter";

export function useApi() {

  const callApi = async (url, options) => {
    await rateLimit(1000); // 1 запрос в секунду
    return requestWithRetry(url, options);
  };

  return { callApi };
}
