-- =============================================================================
-- SCRIPT DE FIX GLOBAL - BANCO DE DADOS ATACADO DE CONSTRUÇÃO
-- Rode este script no SQL Editor do Supabase para corrigir tabelas e permissões.
-- =============================================================================

-- 1) TABELA: whatsapp_clicks (Analytics)
CREATE TABLE IF NOT EXISTS public.whatsapp_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'unknown',
  page TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Garante que todas as colunas existam
ALTER TABLE public.whatsapp_clicks ADD COLUMN IF NOT EXISTS page TEXT;
ALTER TABLE public.whatsapp_clicks ADD COLUMN IF NOT EXISTS device_type TEXT;
ALTER TABLE public.whatsapp_clicks ADD COLUMN IF NOT EXISTS browser TEXT;
ALTER TABLE public.whatsapp_clicks ADD COLUMN IF NOT EXISTS os TEXT;

-- 2) TABELA: site_settings (CMS)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
  logo_url TEXT,
  favicon_url TEXT,
  chat_header_url TEXT,
  banner_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  institutional_title TEXT,
  institutional_body TEXT,
  testimonials JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insere o registro padrão se não existir
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

-- 3) HABILITAR RLS EM TUDO
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- 4) FUNÇÃO DE ADMIN
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5) POLÍTICAS DE ACESSO TOTAL PARA ADMINS (Loop por todas as tabelas)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Admin access" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Admin access" ON public.%I TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    END LOOP;
END $$;

-- 6) POLÍTICAS DE LEITURA PÚBLICA
DROP POLICY IF EXISTS "Public select categories" ON public.categories;
CREATE POLICY "Public select categories" ON public.categories FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select subcategories" ON public.subcategories;
CREATE POLICY "Public select subcategories" ON public.subcategories FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select products" ON public.products;
CREATE POLICY "Public select products" ON public.products FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select settings" ON public.site_settings;
CREATE POLICY "Public select settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select wa_numbers" ON public.whatsapp_numbers;
CREATE POLICY "Public select wa_numbers" ON public.whatsapp_numbers FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public insert clicks" ON public.whatsapp_clicks;
CREATE POLICY "Public insert clicks" ON public.whatsapp_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 7) ANALYTICS: Permitir SELECT para admin no whatsapp_clicks
DROP POLICY IF EXISTS "Admin select clicks" ON public.whatsapp_clicks;
CREATE POLICY "Admin select clicks" ON public.whatsapp_clicks FOR SELECT TO authenticated USING (public.is_admin());
