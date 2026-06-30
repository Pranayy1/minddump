import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#e5e5e5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c8a97e",
            }}
          >
            A digital garden
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 400,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
              padding: "0 40px",
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#c8a97e",
              marginTop: "8px",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "#666666",
              textAlign: "center",
              maxWidth: "500px",
              marginTop: "16px",
            }}
          >
            {SITE.description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
