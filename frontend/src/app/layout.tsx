import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Ghana Charities Directory',
    description: 'Connecting UK-based Ghanaian charities to the world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`min-h-screen bg-zinc-50 text-zinc-900 ${inter.className}`}>
        {children}
        </body>
        </html>
    );
}
