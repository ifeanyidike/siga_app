'use client'

import '@styles/globals.css'
import { Josefin_Sans, Nunito } from 'next/font/google'
import Nav from '@components/Nav'
import { GlobalContextProvider } from './GlobalContextProvider'

const josefin_sans = Josefin_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
})
const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'SIGA Music Event | Live Performances, Equipment Tutoring & More',
  description:
    'Discover SIGA, the ultimate music event web app offering live performances, expert equipment tutoring, and a vibrant community. ',
  Keywords:
    'SIGA, music event app, live performances, equipment tutoring, music education, community, musician tools',
  Category: 'Music Events | Music Education',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={josefin_sans.className}>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <div className='main'>{/* <div className='gradient' /> */}</div>

        <main className='app'>
          <GlobalContextProvider>
            <Nav />
            {children}
          </GlobalContextProvider>
        </main>
        <footer className='footer'>
          Copyright &copy; 2023 SIGA. All rights reserved
        </footer>
      </body>
    </html>
  )
}
