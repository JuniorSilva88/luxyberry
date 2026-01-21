# 🍓 LuxyBerry — Luxury Chocolate-Covered Strawberries

---

## 🇧🇷 PARTE 1 — Visão Geral (Português – pt-BR)

### 📌 Sobre o projeto

Este projeto consiste em um **site one-page premium com sistema de pedidos online**, desenvolvido para a **LuxyBerry**, uma marca de presentes gastronômicos de luxo focada em morangos cobertos com chocolate.

O site foi criado com foco em:
- Posicionamento de marca premium
- Experiência mobile-first
- Clareza para o cliente final
- Pagamento online seguro

Atualmente, o projeto está em **fase de validação e aprovação do cliente**, antes do lançamento oficial no mercado australiano 🇦🇺.

---

### 🌐 Site (ambiente temporário)

🔗 **Link do site:**  
https://luxyberry1.onrender.com/

> ⚠️ **Importante:**  
> Este link é temporário e está sendo utilizado apenas para demonstração e aprovação.  
> Futuramente o site será migrado para um **domínio próprio** e **hospedagem localizada na Austrália**.

---

### 💳 Pagamentos

O sistema de pagamento utiliza **Stripe**, uma das plataformas mais seguras e confiáveis do mundo.

Formas de pagamento suportadas:
- Cartão de crédito
- Cartão de débito
- Apple Pay

✔ Nenhum dado de cartão é armazenado no site  
✔ Todo o processo de pagamento ocorre em ambiente seguro do Stripe  
✔ Padrões internacionais de segurança (PCI)

---

### 🗺️ Próximos passos do projeto

1. Aprovação final do cliente
2. Configuração das chaves Stripe em produção
3. Compra do domínio próprio
4. Migração para hospedagem na Austrália
5. Testes finais
6. Lançamento oficial

---

---

## 🌍 PART 2 — Project Overview (English – Universal)

### 📌 About the Project

This project is a **premium one-page website with an online ordering system**, developed for **LuxyBerry**, a luxury food gifting brand specializing in handcrafted chocolate-covered strawberries.

The website focuses on:
- Luxury brand positioning
- Mobile-first user experience
- Clear and elegant presentation
- Secure online payments

The project is currently in a **client validation and approval phase**, prior to the official launch in the Australian market 🇦🇺.

---

### 🌐 Live Website (temporary)

🔗 **Website URL:**  
https://luxyberry1.onrender.com/

> ⚠️ **Note:**  
> This is a temporary deployment used for demonstration and approval purposes only.  
> The website will later be migrated to a custom domain and Australian-based hosting.

---

### 💳 Payments

Payments are handled using **Stripe**, a globally trusted and secure payment platform.

Supported payment methods:
- Credit cards
- Debit cards
- Apple Pay

✔ No card data is stored on the website  
✔ Payments are processed securely via Stripe Checkout  
✔ Fully compliant with international security standards

---

### 🧱 Repository Structure

```text
luxyberry/
├── backend/        # Node.js backend (Stripe integration)
│   ├── config/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── frontend/       # Static frontend (main website)
│   ├── assets/     # Images and media
│   ├── css/        # Stylesheets
│   ├── js/         # JavaScript
│   └── index.html
│
├── README.md
├── LICENSE
└── .gitignore
