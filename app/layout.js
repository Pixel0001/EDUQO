import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/AuthProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "EDUQO - Cursuri pentru copii în Chișinău",
    template: "%s | EDUQO"
  },
  description: "EDUQO oferă cursuri de calitate pentru copii în Chișinău: limba germană, engleză, franceză, matematică și multe altele. Profesori calificați, curriculum național, grupe mici.",
  keywords: [
    "cursuri copii Chișinău",
    "after school Chișinău", 
    "cursuri limba germană copii",
    "cursuri limba engleză copii",
    "cursuri matematică copii",
    "cursuri limba franceză copii",
    "educație copii Moldova",
    "after school Moldova",
    "Bravito",
    "cursuri după școală"
  ],
  authors: [{ name: "Bravito After School" }],
  creator: "Bravito After School",
  publisher: "Bravito After School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bravitoafterschool.md"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bravito After School - Cursuri pentru copii în Chișinău",
    description: "Cursuri de calitate pentru copii: limba germană, engleză, franceză, matematică. Profesori calificați, curriculum național, grupe mici.",
    url: "https://bravitoafterschool.md",
    siteName: "Bravito After School",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/bravito.png",
        width: 512,
        height: 512,
        alt: "Bravito After School Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bravito After School - Cursuri pentru copii în Chișinău",
    description: "Cursuri de calitate pentru copii: limba germană, engleză, franceză, matematică. Profesori calificați, curriculum național.",
    images: ["/bravito.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    // google: "your-google-verification-code",
  },
  category: "education",
};

// Script to apply theme before page renders to prevent flash
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${poppins.variable} ${quicksand.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
