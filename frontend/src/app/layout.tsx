import "./globals.css";
import {Inter} from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

export const metadata = {
    title: "Ghana Charities Directory",
    description: "Connecting UK-based Ghanaian charities to the world.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/images/gh-charities-logo-simple.png"/>
        </head>
        <body
            className={`${inter.variable} font-sans antialiased min-h-screen bg-gradient-to-b from-zinc-100 via-white to-zinc-100 text-zinc-900`}>
        <Navbar/>
        <Toaster className={"bg-primary"}/>
        <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>
        <footer className="py-8 text-center text-sm text-zinc-500 border-t mt-10">
            &copy; {new Date().getFullYear()} Ghana Charities Directory
        </footer>
        </body>
        </html>
    );
}
