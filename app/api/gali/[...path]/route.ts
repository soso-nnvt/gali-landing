import { NextRequest, NextResponse } from "next/server";
import { GALI_API } from "@/lib/gali";

async function proxy(req: NextRequest, target: string) {
  const headers = new Headers();
  const ct = req.headers.get("content-type");
  if (ct) headers.set("content-type", ct);
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  const init: RequestInit = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") init.body = await req.text();
  const r = await fetch(target, init);
  const body = await r.text();
  return new NextResponse(body, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") || "application/json", "cache-control": "no-store" },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(req, `${GALI_API}/api/${path.join("/")}${req.nextUrl.search}`);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(req, `${GALI_API}/api/${path.join("/")}${req.nextUrl.search}`);
}
