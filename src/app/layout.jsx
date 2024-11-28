"use client";

import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query components
import "./globals.css";
import { Provider } from "@/components/ui/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black !bg-gradient-to-br !from-gray-50 !to-gray-100`}
      >
        <Provider>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
