import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: `Contato | ${SITE.shortName}`,
  description: `Entre em contato com a equipe da ${SITE.shortName}.`,
}

export default function ContatoPage() {
  return (
    <InstitutionalLayout 
      title="Contato" 
      subtitle="Estamos aqui para ajudar. Escolha o canal de sua preferência para falar conosco."
    >
      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Canais de Atendimento */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-[#002D5B]">Canais de Atendimento</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F47920] text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#002D5B]">Telefone e WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">{SITE.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002D5B] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#002D5B]">E-mail</h3>
                  <p className="text-sm text-muted-foreground">{SITE.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-400 text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#002D5B]">Horário</h3>
                  <p className="text-sm text-muted-foreground">Seg a Sex: 08h às 18h<br/>Sáb: 08h às 12h</p>
                </div>
              </div>
            </div>
          </section>

          {/* Localização */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-[#002D5B]">Nossa Matriz</h2>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#002D5B]">Endereço</h3>
                <p className="text-sm text-muted-foreground">
                  {SITE.address.street}<br />
                  {SITE.address.district}, {SITE.address.city}<br />
                  {SITE.address.zip}
                </p>
              </div>
            </div>
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 border-2 border-slate-100 relative">
               <iframe
                 src={`https://maps.google.com/maps?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-[#002D5B] p-8 text-white">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Dúvidas Técnicas ou Orçamentos?</h2>
            <p className="text-white/70 mb-6">Nossa equipe de especialistas está pronta para ajudar você a escolher o melhor material para sua obra.</p>
            <a 
              href={`https://wa.me/${SITE.whatsappE164}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F47920] px-8 py-3.5 font-bold transition hover:scale-105 active:scale-95"
            >
              Falar via WhatsApp
            </a>
          </div>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
