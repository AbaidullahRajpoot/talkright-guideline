import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
// import "bootstrap/dist/js/bootstrap.min.js";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TalkRight",
  description:
    "Explore the TalkRight User Guide, your complete, professional walkthrough for mastering clinic management. This guide provides clear, step-by-step instructions to help you streamline appointments, automate reminders, manage billing, customize templates, and integrate WhatsApp seamlessly. Enhance operational efficiency and communication precision with TalkRight’s all-in-one smart system.",
};

import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('selected-theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <div className="loader-mask">
          <div className="loader">
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </body>
      <Script src="assets/js/main.js" />
      <Script src="assets/js/search.js" />
      <Script src="assets/js/bootstrap.bundle.min.js" />
    </html>
  );
}
