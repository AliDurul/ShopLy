import { Geist, Geist_Mono, Noto_Serif } from "next/font/google"

import "@workspace/ui/globals.css"
import { Suspense } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Toaster } from "@workspace/ui/components/sonner";
import { NavigationProvider } from "@/context/NavigationContext";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TooltipProvider } from "@workspace/ui/components/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geistMono.variable, geistSans.variable, "font-serif", "antialiased pb-16 md:pb-0")}
    >
      <body>
        <TooltipProvider>
          <Header />
          <NavigationProvider>
            {children}
          </NavigationProvider >
          <Suspense>
            <Footer />
          </Suspense>
          <BottomNav />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
