
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import "./App.css";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "GFMI Assistant - Medical Affairs Data Analytics",
  description: "LLM-powered conversational interface for medical survey data analysis. Analyze 250K+ medical affairs datasets with AI-powered insights.",
  keywords: "medical affairs, data analytics, healthcare, AI assistant, medical surveys",
  authors: [{ name: "GFMI Medical Affairs" }],
  openGraph: {
    title: "GFMI Assistant - Medical Affairs Data Analytics",
    description: "LLM-powered conversational interface for medical survey data analysis",
  },
  twitter: {
    card: "summary_large_image",
  },
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         {/* This is for the User Analytics Integration */}
    <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {/* <title>GFMI Assistant - Medical Affairs Data Analytics</title>
    <meta name="description" content="LLM-powered conversational interface for medical survey data analysis. Analyze 250K+ medical affairs datasets with AI-powered insights." />
    <meta name="author" content="GFMI Medical Affairs" />
    <meta name="keywords" content="medical affairs, data analytics, healthcare, AI assistant, medical surveys" />
 
    <meta property="og:title" content="GFMI Assistant - Medical Affairs Data Analytics" />
    <meta property="og:description" content="LLM-powered conversational interface for medical survey data analysis" />
   
 
    <meta name="twitter:card" content="summary_large_image" /> */}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </head>
      {/* <Header /> */}
      {/*  */}
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
      </body>
      {/*  */}
    </html>
  );
}