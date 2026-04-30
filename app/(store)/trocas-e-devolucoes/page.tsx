import InstitutionalLayout from "@/components/store/institutional-layout"
import { SITE } from "@/lib/site-config"

export const metadata = {
  title: `Trocas e Devoluções | ${SITE.shortName}`,
  description: `Saiba como proceder em casos de troca ou devolução na ${SITE.shortName}.`,
}

export default function TrocasPage() {
  return (
    <InstitutionalLayout 
      title="Trocas e Devoluções" 
      subtitle="Transparência e respeito ao consumidor em todas as situações."
    >
      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Condições Gerais</h2>
          <p>
            O compromisso da <strong>{SITE.shortName}</strong> é a sua total satisfação nas compras realizadas em nosso site. 
            Visando a uma parceria de respeito e confiança, criamos a Política de Troca e Devolução, com base no Código de Defesa do Consumidor.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Prazos</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Desistência/Arrependimento:</strong> O prazo é de até 7 (sete) dias corridos a partir do recebimento.</li>
            <li><strong>Avaria ou Divergência:</strong> Deve ser comunicada no ato da entrega para recusa imediata.</li>
            <li><strong>Defeito Técnico:</strong> O prazo é de até 30 (trinta) dias para produtos não duráveis e 90 (noventa) para duráveis.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Estado do Material</h2>
          <p>
            Para que a troca ou devolução seja efetuada, o material não deve apresentar sinais de uso, deve estar em sua embalagem original 
            (se houver), acompanhado de nota fiscal e todos os acessórios. No caso de materiais como cimento e argamassas, os sacos não podem estar rompidos ou úmidos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#002D5B]">Como solicitar?</h2>
          <p>
            Entre em contato através do nosso e-mail <strong>{SITE.email}</strong> ou pelo WhatsApp <strong>{SITE.phoneDisplay}</strong> 
            informando o número do pedido e o motivo da solicitação. Nossa equipe retornará com as instruções de coleta ou troca em até 48 horas úteis.
          </p>
        </section>
      </div>
    </InstitutionalLayout>
  )
}
