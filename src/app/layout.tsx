"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
const inter = Inter({ subsets: ["latin"] });
// export const metadata: Metadata = {
//   title: "GFMI Companion",
//   description: "Enhanced GFMI Companion App",
// };
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         {/* This is for the User Analytics Integration */}
         <head>
        {/* <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(apiKey){
              (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
              v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
                  o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
                  y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
                  z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
         
                  // This function creates visitors and accounts in Pendo
                  // You will need to replace <visitor-id-goes-here> and <account-id-goes-here> with values you use in your app
                  // Please use Strings, Numbers, or Bools for value types.
                  pendo.initialize({
                      visitor: {
                          id:              "Demo User" // Required if user is logged in
                          // email:        // Recommended if using Pendo Feedback, or NPS Email
                          // full_name:    // Recommended if using Pendo Feedback
                          // role:         // Optional
         
                          // You can add any additional visitor level key-values here,
                          // as long as it's not one of the above reserved names.
                      },
         
                      account: {
                          id:              "RWS NextJS Basecode" // Highly recommended, required if using Pendo Feedback
                          // name:         // Optional
                          // is_paying:    // Recommended if using Pendo Feedback
                          // monthly_value:// Recommended if using Pendo Feedback
                          // planLevel:    // Optional
                          // planPrice:    // Optional
                          // creationDate: // Optional
         
                          // You can add any additional account level key-values here,
                          // as long as it's not one of the above reserved names.
                      }
                  });
            })('af0dc1da-6962-4613-51cf-c8117b1c4861');
            `,
            }}
          /> */}
          {/* Accessibility Integration Code */}
 
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GFMI Assistant - Medical Affairs Data Analytics</title>
    <meta name="description" content="LLM-powered conversational interface for medical survey data analysis. Analyze 250K+ medical affairs datasets with AI-powered insights." />
    <meta name="author" content="GFMI Medical Affairs" />
    <meta name="keywords" content="medical affairs, data analytics, healthcare, AI assistant, medical surveys" />
 
    <meta property="og:title" content="GFMI Assistant - Medical Affairs Data Analytics" />
    <meta property="og:description" content="LLM-powered conversational interface for medical survey data analysis" />
   
 
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </head>
      {/* <Header /> */}
      {/*  */}
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="gfmi-theme">
            <TooltipProvider>
              <Toaster />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
      {/*  */}
    </html>
  );
}