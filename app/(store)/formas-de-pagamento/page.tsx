import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { CreditCard, Barcode, Smartphone, Building2 } from "lucide-react"

export const metadata = {
  title: `Formas de Pagamento | ${SITE.shortName}`,
  description: `Confira as condições de pagamento e parcelamento da ${SITE.shortName}.`,
}

export default function PagamentoPage() {
  return (
    <InstitutionalLayout 
      title="Formas de Pagamento" 
      subtitle="Facilidade e segurança para você fechar seu pedido com tranquilidade."
    >
      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-[#002D5B]">
              <Smartphone className="h-6 w-6 text-[#F47920]" />
              <h2 className="text-xl font-bold">PIX</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              A forma mais rápida de processar seu pedido. A confirmação é imediata e permite agilizar o carregamento do material.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-[#002D5B]">
              <CreditCard className="h-6 w-6 text-[#F47920]" />
              <h2 className="text-xl font-bold">Cartões de Crédito</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Aceitamos as principais bandeiras (Visa, Mastercard, Elo, Amex). Parcelamos em até 10x (consulte taxas de parcelamento).
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-[#002D5B]">
              <Barcode className="h-6 w-6 text-[#F47920]" />
              <h2 className="text-xl font-bold">Boleto Bancário</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Disponível para pagamentos à vista. A liberação do pedido ocorre após a compensação bancária (até 2 dias úteis).
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-[#002D5B]">
              <Building2 className="h-6 w-6 text-[#F47920]" />
              <h2 className="text-xl font-bold">Boleto Faturado (PJ)</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Condição exclusiva para empresas e construtoras mediante análise prévia de crédito. Consulte nosso setor financeiro.
            </p>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
          <h3 className="font-bold text-[#002D5B] mb-2">Segurança dos Dados</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Todas as transações realizadas em nosso site são protegidas por protocolos de segurança SSL, garantindo que suas 
            informações financeiras sejam criptografadas e tratadas com total sigilo. Não armazenamos os dados do seu cartão em nossos servidores.
          </p>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
