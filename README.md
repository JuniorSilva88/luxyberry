
---

# LuxyBerry 🍓🍫

## 🇧🇷 Português

### Visão Geral

O **LuxyBerry** é um projeto de **MVP (Minimum Viable Product)** para um site premium de vendas de **morangos cobertos com chocolate**, com foco em **experiência mobile-first**, identidade visual sofisticada e **pagamento online seguro via Stripe**.

O MVP foi desenvolvido com arquitetura real de produção, separando frontend e backend, e já está **tecnicamente pronto para operação comercial**, aguardando apenas validações finais de negócio.

---

### Objetivos do Projeto

* Apresentar a marca LuxyBerry em um **site one-page premium**
* Permitir que o cliente monte um pedido usando **carrinho de compras**
* Possibilitar adicionar múltiplos itens antes do pagamento
* Redirecionar o pagamento para o **Stripe Checkout (ambiente seguro)**
* Exibir **confirmação de pedido pós-pagamento**
* Servir como base sólida para escala futura (automação, marketing, domínio próprio)

---

### Stack Tecnológico

#### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* Mobile-first
* UX de e-commerce com **cart drawer**

Hospedagem:

* **Vercel**

Diretório:

```
frontend/
 ├─ index.html
 ├─ success.html
 ├─ cancel.html
 ├─ css/
 ├─ js/
 └─ assets/
```

Principais funcionalidades:

* Carrinho persistente (sem recarregar página)
* Botão de carrinho no header
* Captura do nome do cliente antes do checkout
* Página de sucesso com referência do pedido
* Página de cancelamento de pagamento

---

#### Backend

* Node.js
* Express.js
* Stripe API (Checkout)

Hospedagem:

* **Render**

Responsabilidades:

* Criar sessões de pagamento no Stripe
* Validar itens do carrinho
* Redirecionar o usuário para o Stripe Checkout
* Definir URLs de sucesso e cancelamento

Diretório:

```
backend/
 ├─ routes/
 ├─ services/
 ├─ server.js
 └─ .env (não versionado)
```

---

### Pagamentos

* Integração com **Stripe Checkout**
* Stripe em **modo LIVE**
* Suporte a:

  * Cartões de crédito
  * Cartões de débito
  * Apple Pay
* Nenhum dado sensível de cartão é armazenado no site
* Pagamento ocorre exclusivamente no ambiente seguro do Stripe

---

### Fluxo de Compra

1. Cliente navega pelo site
2. Adiciona produtos ao carrinho
3. Pode fechar o carrinho e continuar comprando
4. Informa o **nome**
5. Finaliza o pedido
6. É redirecionado para o **Stripe Checkout**
7. Após pagamento:

   * Página de sucesso com confirmação
   * Referência do pedido exibida
   * Acesso rápido ao WhatsApp
8. Em caso de cancelamento:

   * Página dedicada informando que não houve cobrança

---

### Deploy (Estado Atual)

#### Frontend

```
https://luxyberry.vercel.app
```

#### Backend (API / Stripe)

```
https://luxyberry1.onrender.com
```

> O backend está rodando com **chave Stripe LIVE**.

---

### Produção Oficial

O domínio oficial do projeto é:

```
https://luxyberry.com.au
```

Esse domínio é o **endereço recomendado para divulgação comercial**, garantindo maior confiança e percepção de marca.

---

### Decisões de Infraestrutura

* Separação clara entre frontend e backend
* Backend desacoplado para facilitar escala
* Stripe como gateway de pagamento
* Preparado para:

  * Webhooks Stripe
  * Automação de WhatsApp
  * Integração com e-mail
  * Escala de tráfego

---

### Status do Projeto

* ✅ MVP funcional
* ✅ Carrinho implementado
* ✅ Stripe em produção (LIVE)
* ✅ Páginas de sucesso e cancelamento
* ✅ Frontend e backend estáveis
* ⏳ Monitoramento inicial de pedidos

---

### Próximos Passos Planejados

1. Monitorar os primeiros pedidos reais
2. Ajustes finos de UX e conversão
3. Implementar Webhooks do Stripe
4. Automatizar notificações (WhatsApp / e-mail)
5. Otimizações de SEO
6. Escala de marketing e tráfego

---

## 🇺🇸 English

### Overview

**LuxyBerry** is an **MVP (Minimum Viable Product)** for a premium one-page e-commerce website focused on selling **chocolate-covered strawberries**, with a strong emphasis on **mobile-first experience**, refined visual identity, and **secure online payments via Stripe**.

The project was built with a production-ready architecture, separating frontend and backend, and is **technically ready for commercial operation**.

---

### Project Goals

* Present the LuxyBerry brand through a **premium one-page experience**
* Allow customers to build orders using a **shopping cart**
* Enable adding multiple items before checkout
* Redirect payments to **Stripe Checkout** for maximum security
* Display post-payment confirmation pages
* Provide a solid foundation for future scalability

---

### Technology Stack

#### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Mobile-first design
* E-commerce UX with cart drawer

Hosting:

* **Vercel**

Directory:

```
frontend/
 ├─ index.html
 ├─ success.html
 ├─ cancel.html
 ├─ css/
 ├─ js/
 └─ assets/
```

---

#### Backend

* Node.js
* Express.js
* Stripe API (Checkout)

Hosting:

* **Render**

Responsibilities:

* Create Stripe Checkout sessions
* Validate cart items
* Redirect users to the secure Stripe payment flow

Directory:

```
backend/
 ├─ routes/
 ├─ services/
 └─ server.js
```

---

### Payments

* Integrated with **Stripe Checkout**
* Stripe running in **LIVE mode**
* Supports:

  * Credit cards
  * Debit cards
  * Apple Pay
* No sensitive card data is stored on the website

---

### Deployment (Current State)

#### Frontend

```
https://luxyberry.vercel.app
```

#### Backend

```
https://luxyberry1.onrender.com
```

---

### Official Domain

```
https://luxyberry.com.au
```

This is the **recommended production URL** for customers.

---

### Project Status

* Functional MVP
* Stable frontend
* Production-ready backend
* Stripe LIVE enabled
* Ready for real transactions

---

### Next Steps

1. Monitor initial real orders
2. UX and conversion optimizations
3. Stripe webhook integration
4. Automated notifications
5. SEO improvements
6. Official marketing launch

---

