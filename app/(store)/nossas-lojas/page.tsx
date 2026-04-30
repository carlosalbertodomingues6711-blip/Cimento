import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { MapPin, Clock, Phone } from "lucide-react"

export const metadata = {
  title: `Nossas Lojas | ${SITE.shortName}`,
  description: `Encontre a unidade da ${SITE.shortName} mais próxima de você.`,
}

export default function NossasLojasPage() {
  return (
    <InstitutionalLayout 
      title="Nossas Lojas" 
      subtitle="Encontre a unidade mais próxima para retirar seus produtos ou conhecer nosso showroom."
    >
      <div className="space-y-8">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-slate-50/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-[#002D5B]">Unidade Ribeirão Preto (Matriz)</h3>
                <p className="text-sm text-muted-foreground">
                  {SITE.address.street}, {SITE.address.district}<br />
                  {SITE.address.city} - {SITE.address.zip}
                </p>
                <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary">
                  <Phone className="h-4 w-4" />
                  {SITE.phoneDisplay}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-slate-50/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-[#002D5B]">Horário de Funcionamento</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="font-semibold">Segunda a Sexta:</span> 08h às 18h</li>
                  <li><span className="font-semibold">Sábado:</span> 08h às 12h</li>
                  <li><span className="font-semibold">Domingos e Feriados:</span> Fechado</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Logística de Entrega</h2>
          <p>
            Além de nossas unidades físicas, a <strong>{SITE.shortName}</strong> conta com uma frota própria e parceiros logísticos 
            estratégicos para garantir que seu material chegue com agilidade e segurança em qualquer obra da região.
          </p>
          <p>
            Nossa estrutura permite entregas em grandes volumes para construtoras e também fracionadas para pequenas reformas, 
            sempre mantendo o padrão de excelência no atendimento.
          </p>
        </section>

        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 relative group border-2 border-slate-200">
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
      </div>
    </InstitutionalLayout>
  )
}
