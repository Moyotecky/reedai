import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "The AI workspace that works for you. | Notion",
    icons: {
        icon: "https://www.notion.com/front-static/favicon.ico",
        apple: "https://www.notion.com/front-static/logo-ios.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
