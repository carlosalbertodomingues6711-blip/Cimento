# Decisions Log — Atacado de Construção

Registro imutável de decisões arquiteturais.

## ADR-001: Redesign do Dashboard Admin
**Data**: 2026-04-30 | **Status**: Implementado

**Contexto**: O painel anterior era genérico e pouco intuitivo para gestão de vendas.
**Decisão**: Implementar interface baseada em Glassmorphism com métricas claras de faturamento e status de pedidos.

## ADR-002: Integração de Rodízio de WhatsApp
**Data**: 2026-04-30 | **Status**: Implementado

**Contexto**: Leads eram perdidos por falta de distribuição justa entre vendedores.
**Decisão**: Criar lógica de rodízio baseada em banco de dados (`whatsapp_numbers`) para alternar os números no botão de chat.

## ADR-003: Tipografia Nexa Aesthetic
**Data**: 2026-04-30 | **Status**: Implementado

**Contexto**: O usuário solicitou uma identidade visual mais forte baseada na fonte Nexa.
**Decisão**: Utilizar Montserrat (400/600/700/900) para emular com perfeição o estilo Nexa Book/Heavy.
