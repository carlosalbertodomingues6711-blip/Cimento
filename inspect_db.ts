import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://einuwhbvilpfaweiwcvm.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbnV3aGJ2aWxwZmF3ZWl3Y3ZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU2OTUyMiwiZXhwIjoyMDkzMTQ1NTIyfQ.gG7sPAP5IguzwUXevfL3tzhRvC7Gf9diThPpskr9LNE';

const supabase = createClient(supabaseUrl, serviceKey);

async function inspectAndFix() {
  console.log('--- INSPEÇÃO DE TABELAS ---');

  // Testar se conseguimos inserir na tabela 'profiles' (está com 0 linhas)
  const { data: profile, error: pError } = await supabase.from('profiles').upsert([
    {
      id: '00000000-0000-0000-0000-000000000000',
      full_name: 'Sistema Admin',
      email: 'admin@autolandrini.com.br'
    }
  ]);
  
  if (pError) console.error('Erro em Profiles:', pError.message);
  else console.log('✅ Tabela Profiles está acessível.');

  // Testar a tabela de Bids
  const { data: bids, error: bError } = await supabase.from('bids').select('*').limit(1);
  if (bError) {
    console.error('Erro em Bids:', bError.message);
  } else {
    console.log('✅ Tabela Bids está acessível.');
    // Tentar um lance simples sem os campos extras
    const { data: lot } = await supabase.from('lots').select('id').limit(1).single();
    if (lot) {
       const { error: iError } = await supabase.from('bids').insert([{
         lot_id: lot.id,
         amount: 1000
       }]);
       if (iError) console.error('Falha ao inserir lance simples:', iError.message);
       else console.log('✅ Lance simples funcionou. O problema são os campos extras.');
    }
  }

  console.log('--- FIM DA INSPEÇÃO ---');
}

inspectAndFix();
