export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        </div>
    );
}
