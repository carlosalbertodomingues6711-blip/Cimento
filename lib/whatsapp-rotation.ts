import { createClient } from "./supabase/client"
import { SITE } from "./site-config"

export async function getWhatsAppRotationLink(text: string) {
  const supabase = createClient()
  
  try {
    // Busca números ativos ordenados
    const { data, error } = await supabase
      .from("whatsapp_numbers")
      .select("phone")
      .eq("active", true)
      .order("sort_order")

    if (error || !data || data.length === 0) {
      // Fallback para o número padrão se der erro ou não houver números ativos
      return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(text)}`
    }

    // Seleciona um número aleatório (Rodízio)
    // Para um rodízio mais justo, poderíamos salvar qual foi o último usado, 
    // mas o aleatório funciona bem para distribuir a carga.
    const randomIdx = Math.floor(Math.random() * data.length)
    const phone = data[randomIdx].phone

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  } catch {
    return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(text)}`
  }
}
