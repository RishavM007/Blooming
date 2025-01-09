// app/layout.tsx
'use client';  // Add this to specify that this component is client-side
import { Geist, Geist_Mono } from 'next/font/google';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Apollo Client imports
import './globals.css';

// Initialize the Apollo Client
const client = new ApolloClient({
  uri: 'https://demo.bixeltek.com/headless/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>       
        <ApolloProvider client={client}>
          {children} 
        </ApolloProvider>
      </body>
    </html>
  );
}
