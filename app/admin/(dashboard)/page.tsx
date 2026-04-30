"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { FolderTree, Package, Star, ShoppingCart, Clock, Truck } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const supabase = createClient()

async function fetchDashboardData() {
  const [cats, prods, reviews, orders, waClicks] = await Promise.all([
    supabase.from("categories").select("id", { count: "exact" }),
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("reviews").select("id", { count: "exact" }).eq("approved", false),
    supabase.from("orders").select("*, customers(name)").order("created_at", { ascending: false }).limit(10),
    supabase.from("whatsapp_clicks").select("id", { count: "exact" }),
  ])

  const { data: allOrders } = await supabase.from("orders").select("total, status")
  const revenue = allOrders?.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0) || 0
  const pendingOrdersCount = allOrders?.filter((o) => o.status === "pending").length || 0

  return {
    categories: cats.count || 0,
    products: prods.count || 0,
    pendingReviews: reviews.count || 0,
    orders: orders.data || [],
    pendingOrdersCount,
    revenue,
    waClicks: waClicks.count || 0,
  }
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useSWR("dashboard-v5", fetchDashboardData)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const cards = [
    { label: "Faturamento Total", value: `R$ ${data?.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Acumulado" },
    { label: "Pedidos Pendentes", value: data?.pendingOrdersCount || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: "Ação necessária" },
    { label: "Total de Produtos", value: data?.products || 0, icon: Package, color: "text-blue-600", bg: "bg-blue-50", trend: `${data?.categories} categorias` },
    { label: "Cliques no WhatsApp", value: data?.waClicks || 0, icon: Truck, color: "text-indigo-600", bg: "bg-indigo-50", trend: "Interações" },
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Visão Geral</h1>
        <p className="text-sm text-muted-foreground">Monitoramento em tempo real da Atacado de Construção.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="group bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 shadow-sm", c.bg, c.color)}>
                <c.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {c.trend}
              </span>
            </div>
            <div className="mt-5">
              <p className="text-2xl font-black text-foreground tracking-tighter">{c.value}</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              Últimos Pedidos
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <Link href="/admin/pedidos" className="text-xs font-bold text-primary hover:underline transition-colors">Ver todos</Link>
          </div>
          
          <div className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 text-left border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">ID</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Cliente</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Valor</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(!data?.orders || data.orders.length === 0) ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground italic text-sm">
                        Nenhum pedido registrado ainda.
                      </td>
                    </tr>
                  ) : data.orders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-6 py-5">
                        <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">#{order.id.slice(0, 8)}</span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-foreground">{order.customers?.name || "Cliente Final"}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-foreground">R$ {Number(order.total).toFixed(2).replace('.', ',')}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className={cn(
                          "inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                          order.status === "pending" ? "bg-amber-100 text-amber-700" :
                          order.status === "shipping" ? "bg-blue-100 text-blue-700" :
                          order.status === "delivered" ? "bg-emerald-100 text-emerald-700" :
                          "bg-slate-100 text-slate-600"
                        )}>
                          {order.status === "pending" ? "Pendente" :
                           order.status === "shipping" ? "Em Transporte" :
                           order.status === "delivered" ? "Entregue" : order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-foreground px-2">Ações e Alertas</h2>
          
          <div className="space-y-4">
            {data?.pendingReviews > 0 && (
              <Link href="/admin/avaliacoes" className="flex items-center gap-4 p-5 rounded-[2rem] bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-all hover:scale-[1.02] active:scale-95 group shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200 transition-transform group-hover:rotate-12">
                  <Star className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-amber-900">{data.pendingReviews} novas avaliações</p>
                  <p className="text-xs text-amber-700">Aguardando aprovação</p>
                </div>
              </Link>
            )}

            <div className="p-8 rounded-[2.5rem] bg-[#002D5B] text-white space-y-8 shadow-2xl shadow-blue-900/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <FolderTree className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold tracking-tight">Catálogo Base</p>
                  <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Resumo Estrutural</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-center backdrop-blur-sm">
                  <p className="text-3xl font-black tracking-tighter">{data?.categories}</p>
                  <p className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">Categorias</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-center backdrop-blur-sm">
                  <p className="text-3xl font-black tracking-tighter">{data?.products}</p>
                  <p className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">Produtos</p>
                </div>
              </div>

              <Link href="/admin/produtos" className="block w-full py-4 text-center text-xs font-black uppercase tracking-widest bg-[#F47920] text-white rounded-2xl hover:bg-[#e06b10] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-900/40 relative z-10">
                Gerenciar Catálogo
              </Link>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-border bg-card shadow-sm space-y-6">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Atalhos Rápidos</p>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin/whatsapp" className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all hover:translate-x-1 group">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Vendedores</span>
                  <Truck className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link href="/admin/settings" className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all hover:translate-x-1 group">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Configurações</span>
                  <Package className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
