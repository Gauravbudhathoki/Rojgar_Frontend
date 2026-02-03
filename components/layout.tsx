import { AuthProvider } from "@/context/authcontext";
import Header from "./header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                    {/* You can add your Footer here too */}
                </AuthProvider>
            </body>
        </html>
    );
}