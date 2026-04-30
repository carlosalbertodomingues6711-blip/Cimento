import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { Briefcase, Send, Users } from "lucide-react"

export const metadata = {
  title: `Trabalhe Conosco | ${SITE.shortName}`,
  description: `Faça parte da equipe da ${SITE.shortName}. Confira nossas vagas e envie seu currículo.`,
}

export default function TrabalheConoscoPage() {
  return (
    <InstitutionalLayout 
      title="Trabalhe Conosco" 
      subtitle="Venha construir o futuro com a gente. Estamos sempre em busca de novos talentos para integrar nossa equipe."
    >
      <div className="space-y-10">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-slate-50/50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg text-[#002D5B] mb-2">Nossa Cultura</h3>
            <p className="text-sm text-muted-foreground">
              Valorizamos o comprometimento, a transparência e o foco em resultados. Aqui, cada colaborador é peça fundamental para o sucesso de nossos clientes.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-slate-50/50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg text-[#002D5B] mb-2">Oportunidades</h3>
            <p className="text-sm text-muted-foreground">
              Oferecemos vagas em diversas áreas, desde logística e vendas até administrativo e atendimento especializado.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#002D5B]">Como se candidatar</h2>
          <p>
            Se você se identifica com nossos valores e quer crescer profissionalmente em uma empresa sólida e em constante expansão, 
            envie seu currículo para o nosso banco de talentos.
          </p>
          
          <div className="rounded-3xl border border-[#F47920]/20 bg-[#F47920]/5 p-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F47920] text-white mb-4">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-[#002D5B] mb-2">Envie seu currículo por e-mail</h3>
            <p className="text-[#002D5B]/70 mb-4">
              Anexe seu currículo em PDF e informe a área de interesse no assunto do e-mail.
            </p>
            <a 
              href={`mailto:${SITE.email}?subject=Candidatura: [Sua Área de Interesse]`}
              className="inline-flex items-center justify-center rounded-xl bg-[#002D5B] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#002D5B]/90"
            >
              {SITE.email}
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Benefícios</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Ambiente colaborativo",
              "Planos de carreira estruturados",
              "Treinamentos constantes",
              "Vale transporte e alimentação",
              "Seguro de vida em grupo",
              "Descontos em materiais"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F47920]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
