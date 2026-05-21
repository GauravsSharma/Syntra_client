import './globals.css';
import LenisScroll from '../components/Lenis-scroll';
import QueryProvider from './QueryProvider';
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' className='dark'>
            <LenisScroll />
            <body className={`${inter.className}`}>
                <QueryProvider>
               <NextTopLoader
  color="#c8a882"
  initialPosition={0.08}
  crawlSpeed={200}
  height={3}
  crawl={true}
  showSpinner={false}
  easing="ease"
  speed={200}
  shadow="0 0 10px #c8a882, 0 0 5px #d4956a"
/>
                    {children}
                     <Toaster theme='dark'/>
                </QueryProvider>
            </body>
        </html>
    );
}
