let lastCall = 0;

export async function rateLimit(delay = 1000) {
  const now = Date.now();
  const diff = now - lastCall;

  if (diff < delay) {
    await new Promise(res => setTimeout(res, delay - diff));
  }

  lastCall = Date.now();
}
