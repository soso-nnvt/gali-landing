import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function GaliOg({ title, kicker }: { title: string; kicker?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1A1A",
          color: "#F5F3EC",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#13EB66",
              color: "#1A1A1A",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
            GALI<span style={{ display: "flex", color: "#13EB66" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#13EB66",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 54 : 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#A8A29A",
          }}
        >
          <div style={{ display: "flex" }}>The Campus Marketplace with Escrow</div>
          <div style={{ display: "flex" }}>gali.com.ng</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      headers: { "cache-control": "public, max-age=86400, immutable" },
    }
  );
}
