import { Inter, Crimson_Text } from 'next/font/google'
import '@/styles/globals.scss'

// Configuration des polices Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
  display: 'swap'
})

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap'
})

export const metadata = {
  title: 'C&S Création - Univers Artistique',
  description: 'Espace numérique d\'art contemporain - Onirologue aux mille facettes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${crimsonText.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
