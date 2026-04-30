-- =============================================================================
-- SCRIPT DE CORREÇÃO DE SEGURANÇA E RLS - 013_fix_admin_rls.sql
-- Garante que o painel admin tenha acesso total a todas as tabelas
-- e que o público tenha acesso apenas ao necessário.
-- =============================================================================

-- 1) Habilitar RLS em todas as tabelas (caso ainda não estejam)
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- 2) Função Auxiliar para verificar se o usuário é Admin
-- (Evita repetição de código nas políticas)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3) POLÍTICAS PARA ADMINS (Acesso Total)
-- Removemos políticas antigas se existirem para evitar conflitos
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Admin full access" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Admin full access" ON public.%I TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    END LOOP;
END $$;

-- 4) POLÍTICAS PARA PÚBLICO (Leitura)
-- Categorias, Subcategorias, Produtos, Banners, Settings, Reviews (Aprovadas), WA Numbers
DROP POLICY IF EXISTS "Public select categories" ON public.categories;
CREATE POLICY "Public select categories" ON public.categories FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select subcategories" ON public.subcategories;
CREATE POLICY "Public select subcategories" ON public.subcategories FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select products" ON public.products;
CREATE POLICY "Public select products" ON public.products FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select banners" ON public.banners;
CREATE POLICY "Public select banners" ON public.banners FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public select settings" ON public.site_settings;
CREATE POLICY "Public select settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select reviews" ON public.reviews;
CREATE POLICY "Public select reviews" ON public.reviews FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "Public select wa_numbers" ON public.whatsapp_numbers;
CREATE POLICY "Public select wa_numbers" ON public.whatsapp_numbers FOR SELECT USING (active = true);

-- 5) POLÍTICAS PARA CLIENTES AUTENTICADOS (Seus próprios dados)
-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Addresses
DROP POLICY IF EXISTS "Users can manage own addresses" ON public.addresses;
CREATE POLICY "Users can manage own addresses" ON public.addresses TO authenticated USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

-- Orders (Leitura própria)
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT TO authenticated USING (profile_id = auth.uid());

-- 6) ANALYTICS (Inserção pública)
DROP POLICY IF EXISTS "Public insert clicks" ON public.whatsapp_clicks;
CREATE POLICY "Public insert clicks" ON public.whatsapp_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 7) REVIEWS (Inserção pública)
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
