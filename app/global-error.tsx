"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, background: "#F9FAFB", color: "#1A1A1A" }}>
        <div style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Something went wrong</h1>
          <p style={{ color: "#666", marginTop: 8 }}>Please reload the page.</p>
          <button onClick={reset} style={{ marginTop: 16, padding: "12px 20px", borderRadius: 12, border: "1.5px solid #1A1A1A", background: "#13EB66", fontWeight: 700, cursor: "pointer" }}>Reload</button>
        </div>
      </body>
    </html>
  );
}
