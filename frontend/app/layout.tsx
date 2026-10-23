import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={quicksand.className}>
      <body className="bg-sky-50/70 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}