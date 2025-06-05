import { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased">
            <header className="py-4 shadow-sm bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-xl font-bold">🇬🇭 UK Ghana Charities Directory</h1>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
            <footer className="py-6 text-center text-sm text-zinc-500 border-t mt-10">
                &copy; {new Date().getFullYear()} Ghana Charities Directory
            </footer>
        </div>
    );
}
