import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Будинки з клеєного бруса під ключ",
  description: "Проєктування та будівництво будинків з клеєного бруса",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
