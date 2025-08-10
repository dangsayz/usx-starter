
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000){
  const now = Date.now();
  const cur = hits.get(key);
  if (!cur || now > cur.reset){
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (cur.count >= limit){
    return { ok: false, remaining: 0, reset: cur.reset };
  }
  cur.count++;
  return { ok: true, remaining: limit - cur.count };
}
