import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { Search, Package, Truck, CheckCircle } from "lucide-react"

export const metadata = {
  title: `Rastrear Pedido | ${SITE.shortName}`,
  description: `Consulte o status da sua entrega na ${SITE.shortName}.`,
}

export default function RastrearPedidoPage() {
  return (
    <InstitutionalLayout 
      title="Rastrear Pedido" 
      subtitle="Acompanhe cada etapa da entrega do seu material de construção."
    >
      <div className="space-y-12">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#002D5B] mb-6">Consulte seu status</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Package className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Número do pedido ou CPF/CNPJ" 
                className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm outline-none focus:border-[#F47920] transition-all"
              />
            </div>
            <button className="rounded-2xl bg-[#002D5B] px-8 py-4 font-bold text-white transition hover:bg-[#002D5B]/90 active:scale-95">
              Rastrear Agora
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400">O número do pedido foi enviado para o seu e-mail no momento da compra.</p>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-bold text-[#002D5B] text-center">Entenda as etapas da entrega</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: CheckCircle, title: "Processado", desc: "Pagamento confirmado e pedido em separação." },
              { icon: Package, title: "Em Rota", desc: "Seu material já está no caminhão a caminho." },
              { icon: Truck, title: "Entrega Hoje", desc: "O motorista está na sua região agora." },
              { icon: CheckCircle, title: "Entregue", desc: "Material conferido e entregue na obra." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-[#002D5B]">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-[#F47920]/20 bg-[#F47920]/5 p-6 text-center">
           <p className="text-sm font-medium text-[#002D5B]">Dúvidas sobre o frete? Chame nosso suporte operacional no WhatsApp.</p>
        </div>
      </div>
    </InstitutionalLayout>
  )
}
