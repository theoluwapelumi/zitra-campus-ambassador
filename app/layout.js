import './globals.css'

export const metadata = {
  title: 'Zitra Campus Ambassador Program | ₦250k Annual Scholarship',
  description: 'Join the Zitra Campus Ambassador Program and win up to ₦250,000 in annual scholarships. Represent Zitra Bank on your campus while excelling academically.',
  keywords: ['Zitra', 'Campus Ambassador', 'Scholarship', 'Nigeria', 'Banking', 'Students'],
  authors: [{ name: 'Zitra Bank' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Zitra Campus Ambassador Program',
    description: 'Win up to ₦250,000 in annual scholarships. Represent Zitra Bank on your campus.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Zitra Campus Ambassador',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zitra Campus Ambassador Program',
    description: 'Win up to ₦250,000 in annual scholarships. Represent Zitra Bank on your campus.',
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
