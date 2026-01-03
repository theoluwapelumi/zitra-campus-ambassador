import './globals.css'

export const metadata = {
  title: 'Zitra Campus Ambassador Program | ₦250k Annual Scholarship',
  description: 'Join the Zitra Campus Ambassador Program and win up to ₦250,000 in annual scholarships. Represent Zitra Bank on your campus while excelling academically.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  )
}
