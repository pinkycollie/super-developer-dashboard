import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SUPER DEVELOPER",
  description: "Full Stack Development Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

