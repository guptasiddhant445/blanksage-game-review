import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlankSage - Game Review Recreation",
  description: "A polished, maintainable recreation of the core Chess.com Game Review experience built for BlankSage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
