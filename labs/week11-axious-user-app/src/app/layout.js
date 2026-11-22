
import "./globals.css";

export const metadata = {
    title: "Next.js User Management",
    description: "React Axios and dynamic routing example",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-50 antialiased">

                <nav className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                        <a
                            href="/users"
                            className="text-xl font-bold text-blue-700"
                        >
                            UserHub
                        </a>

                        <a
                            href="/users"
                            className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Users
                        </a>

                    </div>
                </nav>

                {children}

                <footer className="border-t border-gray-200 bg-white py-5 text-center text-sm text-gray-500">
                    Next.js + React + Axios + useEffect Demo
                </footer>

            </body>
        </html>
    );
}
