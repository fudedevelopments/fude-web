import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import AppBar from '@/components/ui/AppBar'
import Footer from '@/components/ui/Footer'
import NeuralBackgroundWrapper from '@/components/3d/NeuralBackgroundWrapper'
import { NavigationProvider } from '@/providers/NavigationProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Fude Development – AI-Powered Software Solutions',
  description:
    'We develop AI-driven websites, Android apps, and smart automation solutions.',
  keywords:
    'AI, web development, Android apps, machine learning, automation, software development',
  icons: {
    icon: '/images/logo/fude-logo.svg',
    shortcut: '/images/logo/fude-logo.svg',
    apple: '/images/logo/fude-logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {/* Meta Pixel Code */}
        <Script
          id='meta-pixel'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1538215984313423');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src='https://www.facebook.com/tr?id=1538215984313423&ev=PageView&noscript=1'
            alt=''
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <NavigationProvider>
          {/* Neural Network Background - Fixed and shared across all pages */}
          <NeuralBackgroundWrapper />

          {/* Main App Structure */}
          <div className='relative' style={{ zIndex: 10 }}>
            <AppBar />
            <main className='relative'>{children}</main>
            <Footer />
          </div>
        </NavigationProvider>
      </body>
    </html>
  )
}
