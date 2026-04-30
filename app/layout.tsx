import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { SITE } from '@/lib/site-config'
import { BRANDING } from '@/lib/branding'
import { getSiteSettingsServer } from '@/lib/site-settings-server'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'], // 400 = Book, 600 = SemiBold, 700 = Bold, 800 = ExtraBold, 900 = Heavy
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsServer()
  const favUrl = settings?.favicon_url?.trim()

  return {
    title: {
      default: `${SITE.legalName} — Materiais de construção`,
      template: `%s | ${SITE.shortName}`,
    },
    description: SITE.tagline,
    icons: favUrl
      ? { icon: [{ url: favUrl }] }
      : { icon: [{ url: "/logo-footer.jpg", type: "image/jpeg" }] },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable}`}>
      <body className="font-montserrat antialiased">
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
