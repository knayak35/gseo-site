import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GSEO | Global Scholars Excellence Organization",
  description:
    "A student-founded global platform making student research and educational content freely accessible worldwide.",
  openGraph: {
    title: "GSEO | Global Scholars Excellence Organization",
    description:
      "Empowering scholars. Expanding futures.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
