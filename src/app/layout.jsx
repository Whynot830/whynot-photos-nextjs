import { AuthProvider } from "@/components/AuthContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "WhyNot Photos",
  description: "Simple web-gallery app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='dark'>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex h-dvh flex-col relative ">
              <div className="flex-1">
                <Header />
                <main className="container py-2">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}