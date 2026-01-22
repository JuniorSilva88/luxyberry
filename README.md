# Luxyberry

## 🇧🇷 Português

### Visão Geral

O **Luxyberry** é um projeto de **MVP (Minimum Viable Product)** para um site premium de vendas de **morangos cobertos com chocolate**, com foco em experiência mobile-first, identidade visual sofisticada e **pagamento online seguro via Stripe**.

O projeto foi concebido para validação inicial do negócio, com decisões técnicas já alinhadas para uma futura entrada em produção profissional.

---

### Objetivos do Projeto

* Apresentar a marca Luxyberry em um **site one-page premium**
* Permitir que o cliente realize pedidos online de forma simples
* Redirecionar o pagamento para o **Stripe Checkout**, garantindo segurança
* Servir como base sólida para evolução do produto (escala, domínio próprio, marketing)

---

### Stack Tecnológico

#### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* Estrutura mobile-first

Diretório:

```
frontend/
 ├─ index.html
 ├─ css/
 ├─ js/
 └─ assets/
```

#### Backend

* Node.js
* Express.js
* Stripe API (Checkout)

Responsável apenas por:

* Criar sessões de pagamento no Stripe
* Redirecionar o usuário para o ambiente seguro de pagamento

Diretório:

```
backend/
 ├─ config/
 ├─ routes/
 ├─ services/
 └─ server.js
```

---

### Pagamentos

* Integração com **Stripe Checkout**
* Suporte a:

  * Cartões de crédito
  * Cartões de débito
  * Apple Pay
* Nenhum dado sensível de cartão é armazenado no site

---

### Deploy (Estado Atual)

⚠️ **Ambiente temporário / demonstração**

O projeto está publicado provisoriamente no Render apenas para testes e validação:

```
https://luxyberry1.onrender.com/
```

> Este endereço **não representa o ambiente final de produção**.

---

### Decisões de Infraestrutura (Planejamento de Produção)

As seguintes decisões já estão definidas para a versão de produção:

* Uso de **domínio próprio** (.com ou .com.au)
* Hospedagem estável na **Austrália** (ex.: DigitalOcean – Sydney)
* Stripe em modo produção
* Evitar plataformas com domínio temporário em produção

Essas decisões visam **confiabilidade, performance e percepção de marca**.

---

### Status do Projeto

* MVP funcional
* Frontend estável
* Backend mínimo operando com Stripe Checkout
* Em fase de validação e refinamento

---

### Próximos Passos

1. Aprovação final do layout e fluxo
2. Ativação das chaves Stripe de produção
3. Compra e configuração do domínio
4. Migração para hospedagem definitiva
5. Testes finais (pagamento, usabilidade, SEO)
6. Lançamento oficial

---

## 🇺🇸 English

### Overview

**Luxyberry** is an **MVP (Minimum Viable Product)** for a premium one-page website focused on selling **chocolate-covered strawberries**, emphasizing a refined visual identity, mobile-first experience, and **secure online payments via Stripe**.

The project was designed for early business validation, with technical decisions already aligned for a professional production launch.

---

### Project Goals

* Present the Luxyberry brand through a **premium one-page website**
* Allow customers to place orders online easily
* Redirect payments to **Stripe Checkout** for maximum security
* Serve as a solid foundation for future growth and scalability

---

### Technology Stack

#### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Mobile-first structure

Directory:

```
frontend/
 ├─ index.html
 ├─ css/
 ├─ js/
 └─ assets/
```

#### Backend

* Node.js
* Express.js
* Stripe API (Checkout)

Responsibilities:

* Create Stripe Checkout sessions
* Redirect users to the secure payment environment

Directory:

```
backend/
 ├─ config/
 ├─ routes/
 ├─ services/
 └─ server.js
```

---

### Payments

* Integrated with **Stripe Checkout**
* Supports:

  * Credit cards
  * Debit cards
  * Apple Pay
* No sensitive card data is stored on the website

---

### Deployment (Current State)

⚠️ **Temporary / demo environment**

The project is currently deployed on Render for testing and validation purposes only:

```
https://luxyberry1.onrender.com/
```

> This URL **does not represent the final production environment**.

---

### Infrastructure Decisions (Production Planning)

The following decisions are already defined for production:

* Use of a **custom domain** (.com or .com.au)
* Stable hosting in **Australia** (e.g., DigitalOcean – Sydney)
* Stripe in production mode
* Avoidance of temporary hosting domains in production

These choices aim to ensure **reliability, performance, and brand credibility**.

---

### Project Status

* Functional MVP
* Stable frontend
* Minimal backend integrated with Stripe Checkout
* Under validation and refinement

---

### Next Steps

1. Final approval of layout and user flow
2. Enable Stripe production keys
3. Purchase and configure custom domain
4. Migrate to definitive hosting
5. Final tests (payments, usability, SEO)
6. Official launch
