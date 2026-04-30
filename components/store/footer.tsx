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
            <div className="w-32 lg:w-40 py-4">
              <DynamicBrandLogo variant="square" />
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
            <ul className="grid grid-cols-1 gap-y-3 gap-x-8 text-sm font-medium text-white/70">
              <li><Link href="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/nossas-lojas" className="hover:text-white transition-colors">Nossas Lojas</Link></li>
              <li><Link href="/trabalhe-conosco" className="hover:text-white transition-colors">Trabalhe Conosco</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Dicas</Link></li>
              <li><Link href="/rastrear-pedido" className="hover:text-white transition-colors">Rastrear Pedido</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Links: Ajuda & Suporte */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#F47920]">Ajuda</h4>
            <ul className="space-y-3 text-sm font-medium text-white/70">
              <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/trocas-e-devolucoes" className="hover:text-white transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/politica-de-frete" className="hover:text-white transition-colors">Política de Frete</Link></li>
              <li><Link href="/formas-de-pagamento" className="hover:text-white transition-colors">Formas de Pagamento</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#F47920]">Contato</h4>
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
                <p className="text-xs leading-relaxed">
                  {SITE.address.street}<br/>
                  {SITE.address.district}<br/>
                  {SITE.address.city}<br/>
                  {SITE.address.zip}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-white/40">
              © 2026 Atacado de Construção. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              CNPJ e razão social conforme contrato social.
            </p>
          </div>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-5 w-auto" />
             <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-5 w-auto" />
             <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-5 w-auto" />
             <img src="https://img.icons8.com/color/48/barcode.png" alt="Boleto" className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  )
}
