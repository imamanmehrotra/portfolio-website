import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechMonk",
  description: "Portfolio of Aman Mehrotra, a seasoned Data Scientist and AI Engineer leading AI initiatives at PepsiCo. Expert in AI adoption strategy, generative AI solution architecture, and end-to-end development of intelligent applications.",
  keywords: ["Data Science", "AI Engineer", "Machine Learning", "GenAI", "Azure", "PepsiCo", "Portfolio"],
  authors: [{ name: "Aman Mehrotra" }],
  creator: "Aman Mehrotra",
  openGraph: {
    title: "TechMonk",
    description: "Portfolio of Aman Mehrotra, a seasoned Data Scientist and AI Engineer leading AI initiatives at PepsiCo.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || 'dark';
                document.documentElement.className = theme;
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
