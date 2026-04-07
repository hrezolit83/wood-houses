import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.ua";
const isProduction = BASE_URL.includes("timberhouse.ua");

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
      </body>
    </html>
  );
}
