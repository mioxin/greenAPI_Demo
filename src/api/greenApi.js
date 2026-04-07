import { log } from "../utils/logger";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function requestWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      log("REQUEST", url);

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      log("RESPONSE", data);

      return data;

    } catch (err) {
      log("ERROR", err.message);

      if (i === retries - 1) throw err;

      await delay(500 * (i + 1)); // exponential backoff
    }
  }
}
