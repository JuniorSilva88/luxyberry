# 🍓 LuxyBerry — Luxury Chocolate-Covered Strawberries

---

## 🇧🇷 PARTE 1 — Visão Geral (Português – pt-BR)

### 📌 Sobre o projeto

Este projeto consiste em um **site one-page premium com sistema de pedidos online**, desenvolvido para a **LuxyBerry**, uma marca de presentes gastronômicos de luxo especializada em morangos cobertos com chocolate.

O site foi criado com foco em:

- Posicionamento de marca premium  
- Experiência **mobile-first**  
- Clareza no processo de pedido  
- Pagamento online seguro e confiável  

Atualmente, o projeto encontra-se em **fase de validação e aprovação do cliente**, antes do lançamento oficial no mercado australiano 🇦🇺.

---

### 🌐 Site (ambiente temporário)

🔗 **Link do site:**  
https://luxyberry1.onrender.com/

> ⚠️ **Importante:**  
> Este link é **temporário** e está sendo utilizado exclusivamente para **demonstração, testes e aprovação**.  
> Após a validação final, o site será migrado para um **domínio próprio** e **hospedagem localizada na Austrália**, garantindo melhor performance e credibilidade para o público local.

---

### 💳 Pagamentos

O sistema de pagamento utiliza **Stripe**, uma das plataformas de pagamento mais seguras e amplamente utilizadas no mundo.

Formas de pagamento suportadas:
- Cartão de crédito  
- Cartão de débito  
- Apple Pay  

✔ Nenhum dado de cartão é armazenado no site  
✔ Todo o pagamento ocorre em ambiente seguro do Stripe (Checkout)  
✔ Conformidade com padrões internacionais de segurança (PCI-DSS)

---

### 🛠️ Arquitetura (resumo)

- **Frontend**  
  Site estático (HTML, CSS e JavaScript), com layout premium e foco em mobile.

- **Backend**  
  Node.js + Express, responsável apenas por:
  - Criar sessões de pagamento no Stripe
  - Redirecionar o cliente para o checkout seguro

- **Hospedagem atual**  
  - Frontend e backend hospedados temporariamente no **Render**
  - Backend acessado via **URL absoluta**, permitindo múltiplos frontends (Netlify, Render, domínio futuro)

---

### 🗺️ Próximos passos do projeto

1. Aprovação final do cliente  
2. Configuração das **chaves Stripe em produção**  
3. Compra do domínio próprio  
4. Migração para hospedagem na Austrália  
5. Testes finais (pagamento e usabilidade)  
6. Lançamento oficial  

---

---

## 🌍 PART 2 — Project Overview (English – Universal)

### 📌 About the Project

This project is a **premium one-page website with an online ordering system**, developed for **LuxyBerry**, a luxury food gifting brand specializing in handcrafted chocolate-covered strawberries.

The website focuses on:

- Luxury brand positioning  
- Mobile-first user experience  
- Clear ordering flow  
- Secure online payments  

The project is currently in a **client validation and approval phase**, prior to the official launch in the Australian market 🇦🇺.

---

### 🌐 Live Website (temporary)

🔗 **Website URL:**  
https://luxyberry1.onrender.com/

> ⚠️ **Note:**  
> This is a **temporary deployment** used for demonstration, testing, and approval purposes only.  
> The website will later be migrated to a custom domain and hosting located in Australia.

---

### 💳 Payments

Payments are processed using **Stripe**, a globally trusted and secure payment platform.

Supported payment methods:
- Credit cards  
- Debit cards  
- Apple Pay  

✔ No card data is stored on the website  
✔ Payments are processed securely via Stripe Checkout  
✔ Fully compliant with international security standards (PCI-DSS)

---

### 🛠️ Technical Architecture (Summary)

- **Frontend**  
  Static website (HTML, CSS, JavaScript) with a premium, mobile-first layout.

- **Backend**  
  Node.js + Express, responsible for:
  - Creating Stripe Checkout sessions
  - Redirecting users to secure payment pages

- **Current Hosting**  
  - Frontend and backend hosted temporarily on **Render**
  - Backend accessed via **absolute URLs** to support multiple frontend deployments

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
