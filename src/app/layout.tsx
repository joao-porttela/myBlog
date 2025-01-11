import type {Metadata, Viewport} from "next";

import "./globals.css";

import {ThemeProvider} from "next-themes";
import Navigation from "@/components/nav/Navigation";
import {ToggleProvider} from "@/providers/toggle-provider";
import {Toaster} from "@/components/ui/toaster";
import {AuthProvider} from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "myBlog",
  description: "My personal study blog",
};

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
  themeColor: [{color: "#000"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthProvider>
            <ToggleProvider>
              <Navigation />
              {children}
              <Toaster />
            </ToggleProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
