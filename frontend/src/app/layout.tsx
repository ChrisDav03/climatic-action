import { AuthProvider } from "../context/AuthContext";
import { Inter as FontSans } from "next/font/google";;
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <main className="container mx-auto pt-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
