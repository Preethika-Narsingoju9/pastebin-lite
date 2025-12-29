import { redis } from "@/lib/redis";

export const runtime = "nodejs"; // 👈 THIS IS THE FIX

export async function GET() {
  try {
    await redis.ping();
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Redis error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}


