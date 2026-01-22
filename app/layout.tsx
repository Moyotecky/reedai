import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { DM_Sans } from "next/font/google"; // Import DM Sans from next/font/google
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

export const metadata: Metadata = {
    title: "ReedAI - A voice-first AI tutor built for real understanding.",
    description: "ReedAI is an intelligent tutoring platform that helps students learn by talking things through.",
    icons: {
        icon: "/favicon.ico", // Updated to default Next.js favicon for now
    },
};

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${GeistSans.variable} ${dmSans.variable} font-sans`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
