import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"
import { Newspaper, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: `Blog & Dicas | ${SITE.shortName}`,
  description: `Dicas de construção, tendências e informações técnicas para sua obra.`,
}

export default function BlogPage() {
  const posts = [
    {
      title: "Como escolher o cimento ideal para sua laje",
      excerpt: "Entenda as diferenças entre os tipos de cimento e qual garante a melhor resistência para sua estrutura.",
      date: "25 Abr, 2024",
      category: "Dicas de Obra"
    },
    {
      title: "Vantagens da compra de materiais no atacado",
      excerpt: "Saiba como economizar significativamente no custo final da sua obra comprando em grandes volumes.",
      date: "18 Abr, 2024",
      category: "Economia"
    },
    {
      title: "Impermeabilização: o segredo para evitar infiltrações",
      excerpt: "Dicas práticas de como proteger sua construção desde o alicerce até o acabamento final.",
      date: "10 Abr, 2024",
      category: "Manutenção"
    }
  ]

  return (
    <InstitutionalLayout 
      title="Blog & Dicas" 
      subtitle="Conteúdo especializado para ajudar você a construir com mais qualidade e economia."
    >
      <div className="space-y-12">
        <div className="grid gap-8">
          {posts.map((post, i) => (
            <div key={i} className="group relative flex flex-col gap-4 rounded-3xl border border-border/50 bg-slate-50/30 p-6 transition hover:bg-white hover:shadow-app-lg md:flex-row md:items-center md:gap-8">
              <div className="h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-200 md:h-32 md:w-48">
                <div className="flex h-full w-full items-center justify-center bg-[#002D5B]/5">
                  <Newspaper className="h-10 w-10 text-[#002D5B]/20" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#F47920]">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#002D5B] group-hover:text-[#F47920] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002D5B] mt-2 group-hover:gap-2 transition-all"
                >
                  Ler artigo completo
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-[#002D5B] p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Quer receber nossas dicas por e-mail?</h3>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">Assine nossa newsletter e fique por dentro das novidades e ofertas exclusivas.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm outline-none border border-white/10 focus:border-white/30 transition-all"
            />
            <button className="rounded-xl bg-[#F47920] px-6 py-3 text-sm font-bold transition hover:bg-[#F47920]/90">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </InstitutionalLayout>
  )
}
