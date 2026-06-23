import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentInit from "@/components/Analytics/ConsentInit";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";
const isProduction = BASE_URL.includes("timberhouse.biz");

export const metadata = isProduction
  ? {}
  : { robots: { index: false, follow: false } };

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <ConsentInit />
        <GoogleAnalytics />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#2C1810",
              color: "#fff",
              borderRadius: "8px",
            },
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
