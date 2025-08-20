import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import AppBar from '@/components/ui/AppBar'
import Footer from '@/components/ui/Footer'
import NeuralBackgroundWrapper from '@/components/3d/NeuralBackgroundWrapper'

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
        {/* Neural Network Background - Fixed and shared across all pages */}
        <NeuralBackgroundWrapper />

        {/* Main App Structure */}
        <div className='relative' style={{ zIndex: 10 }}>
          <AppBar />
          <main className='relative'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
