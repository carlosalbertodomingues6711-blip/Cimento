import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"

export const metadata = {
  title: `Política de Cookies | ${SITE.shortName}`,
  description: `Saiba como utilizamos cookies para melhorar sua experiência na ${SITE.shortName}.`,
}

export default function CookiesPage() {
  return (
    <InstitutionalLayout 
      title="Política de Cookies" 
      subtitle="Transparência sobre como utilizamos tecnologias de rastreamento para oferecer uma experiência personalizada."
    >
      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">O que são cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. 
            Eles ajudam o site a reconhecer seu dispositivo e lembrar informações sobre sua visita, como seu idioma preferido e outras configurações.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Como utilizamos os cookies?</h2>
          <p>Utilizamos cookies para diversas finalidades:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Essenciais:</strong> Necessários para que o site funcione corretamente, como o carrinho de compras.</li>
            <li><strong>Desempenho:</strong> Coletam informações anônimas sobre como os visitantes utilizam o site.</li>
            <li><strong>Funcionais:</strong> Permitem que o site se lembre de escolhas que você fez.</li>
            <li><strong>Marketing:</strong> Utilizados para exibir anúncios mais relevantes para você.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Como gerenciar seus cookies?</h2>
          <p>
            Você pode controlar e/ou excluir cookies conforme desejar através das configurações do seu navegador. 
            No entanto, lembre-se de que a desativação de cookies pode afetar a funcionalidade deste e de muitos outros sites que você visita.
          </p>
        </section>

        <section className="space-y-4 border-t border-border/50 pt-6 mt-8">
          <p className="text-xs text-muted-foreground">
            Esta política de cookies foi atualizada pela última vez em {new Date().toLocaleDateString('pt-BR')}.
          </p>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
