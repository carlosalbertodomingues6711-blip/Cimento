import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { Truck, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: `Política de Frete | ${SITE.shortName}`,
  description: `Informações sobre prazos, custos e regiões de entrega da ${SITE.shortName}.`,
}

export default function FretePage() {
  return (
    <InstitutionalLayout 
      title="Política de Frete" 
      subtitle="Logística profissional para garantir que seu material chegue no momento certo da obra."
    >
      <div className="space-y-10">
        <section className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Truck className="h-8 w-8 text-[#F47920] mb-2" />
            <h3 className="font-bold text-sm text-[#002D5B]">Frota Própria</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Garantia de cuidado e agilidade no manuseio.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <MapPin className="h-8 w-8 text-[#F47920] mb-2" />
            <h3 className="font-bold text-sm text-[#002D5B]">Raio de Atuação</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Entregamos em toda a região de Ribeirão Preto.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Clock className="h-8 w-8 text-[#F47920] mb-2" />
            <h3 className="font-bold text-sm text-[#002D5B]">Prazo Médio</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Entregas em até 24h ou 48h conforme estoque.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Custos de Entrega</h2>
          <p>
            O valor do frete é calculado com base na distância entre nossa matriz e o local da obra, além do peso e volume total do pedido. 
            Para pedidos acima de determinados volumes, oferecemos <strong>frete cortesia</strong> em regiões selecionadas. Consulte seu vendedor.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Agendamento</h2>
          <p>
            Trabalhamos com entregas em horário comercial. Caso sua obra possua restrições de horário para entrada de caminhões ou 
            dificuldades de descarga, por favor, informe no momento da formalização do pedido.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Descarga de Materiais</h2>
          <p>
            Nossas entregas são realizadas no pavimento térreo, em local de fácil acesso ao caminhão. Nossos motoristas não estão autorizados 
            a subir escadas ou realizar transportes manuais de longa distância dentro do canteiro de obras por questões de segurança.
          </p>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
