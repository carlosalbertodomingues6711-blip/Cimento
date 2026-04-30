import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ShieldCheck, CreditCard } from "lucide-react"
import Link from "next/link"
import DynamicBrandLogo from "@/components/store/dynamic-brand-logo"
import { SITE } from "@/lib/site-config"

export default function StoreFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#002D5B] text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Social */}
          <div className="space-y-6">
            <div className="w-44 lg:w-64 py-4">
              <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                {/* Navy rounded background to match footer */}
                <rect width="400" height="400" rx="40" fill="#002D5B" />
                {/* White bag-like shape */}
                <path d="M100 100 Q100 70 130 70 H270 Q300 70 300 100 V300 Q300 330 270 330 H130 Q100 330 100 300 Z" fill="white" />
                {/* Top orange triangle */}
                <path d="M150 70 L200 160 L250 70 Z" fill="#F47920" />
                {/* Central C icon */}
                <g transform="translate(140, 180)">
                  <path d="M100 0 A50 50 0 1 0 100 100" fill="none" stroke="#002D5B" strokeWidth="45" />
                  {/* Trowel */}
                  <path d="M45 40 L75 25 L100 45 L70 60 Z" fill="#002D5B" />
                </g>
                {/* Bottom orange sack */}
                <rect x="175" y="280" width="50" height="65" rx="8" fill="#F47920" transform="scale(0.85) translate(40, 50)" />
                {/* Brand text */}
                <text x="200" y="380" fill="white" textAnchor="middle" style={{ font: '900 28px sans-serif', letterSpacing: '0.05em' }}>C&C DISTRIBUIDORA</text>
              </svg>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Sua parceira de confiança em materiais de construção. Preço de atacado, entrega ágil e atendimento especializado para sua obra.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#F47920] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#F47920] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#F47920] transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links: Institucional */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#F47920]">Institucional</h4>
            <ul className="space-y-4 text-sm font-medium text-white/70">
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre a {SITE.shortName}</Link></li>
              <li><Link href="/nossas-lojas" className="hover:text-white transition-colors">Nossas Lojas</Link></li>
              <li><Link href="/trabalhe-conosco" className="hover:text-white transition-colors">Trabalhe Conosco</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Dicas</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
            </ul>
          </div>

          {/* Links: Atendimento */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#F47920]">Atendimento</h4>
            <ul className="space-y-4 text-sm font-medium text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F47920] shrink-0" />
                <div>
                   <p className="text-white font-semibold">{SITE.phoneDisplay}</p>
                   <p className="text-[10px]">Seg a Sex: 08h às 18h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F47920] shrink-0" />
                <p>{SITE.email}</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F47920] shrink-0" />
                <p>São Paulo, SP - Brasil</p>
              </li>
            </ul>
          </div>

          {/* Help / Security */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#F47920]">Segurança</h4>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   <span className="text-[10px] font-bold uppercase">Site Seguro</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                   <CreditCard className="w-5 h-5 text-[#F47920]" />
                   <span className="text-[10px] font-bold uppercase">Pagamento SSL</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                 <p className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40">Formas de Pagamento</p>
                 <div className="flex flex-wrap gap-2 opacity-80">
                    <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 w-auto grayscale hover:grayscale-0 transition-all" />
                    <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 w-auto grayscale hover:grayscale-0 transition-all" />
                    <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-6 w-auto grayscale hover:grayscale-0 transition-all" />
                    <img src="https://img.icons8.com/color/48/barcode.png" alt="Boleto" className="h-6 w-auto grayscale hover:grayscale-0 transition-all" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-white/40">
              © {currentYear} {SITE.name}. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-white/20">
              CNPJ: 00.000.000/0001-00 | Rua Exemplo, 123 - São Paulo/SP
            </p>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="/politica-de-cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
