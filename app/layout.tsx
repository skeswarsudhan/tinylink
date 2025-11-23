import { Open_Sans } from 'next/font/google'
// import './globals.css'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  )
}