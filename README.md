# 🍓 LuxyBerry — Gourmet Chocolate-Covered Strawberries

Site oficial da **_luxyberry**, um negócio artesanal na Austrália especializado em caixas personalizadas de morangos cobertos com chocolate.

---

## ✨ Sobre o projeto
Este repositório contém o código do site da _luxyberry.  
Nosso objetivo é oferecer uma experiência de compra doce e luxuosa, permitindo que clientes personalizem suas caixas e acompanhem suas entregas.

---

## 🎁 Funcionalidades
- Personalização de caixas (tamanho, tipo de chocolate, toppings).
- Carrinho de compras e checkout online.
- Rastreamento de entregas em tempo real.
- Layout responsivo para celular e desktop.
- Integração com Instagram para mostrar novidades e promoções.
- Pagamentos seguros via Stripe (suportado na Austrália).

---

## 🛠️ Tecnologias
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js com Express  
- **Pagamentos:** Stripe  
- **Outros:** CORS para desenvolvimento  

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### Passos

1. **Clone ou baixe o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/luxyberry.git
   cd luxyberry
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as chaves do Stripe**:
   - Crie uma conta em [Stripe](https://stripe.com/au) (suportado na Austrália).
   - Obtenha suas chaves de API (Publishable Key e Secret Key).
   - No arquivo `server.js`, substitua `'sk_test_...'` pela sua Secret Key.
   - No arquivo `js/script.js`, substitua `'pk_test_...'` pela sua Publishable Key.

4. **Configure o Feed do Instagram (opcional)**:
   - Para carregar fotos dinamicamente, siga os passos no código `js/script.js` para obter um Access Token do Instagram Basic Display API.
   - Substitua `'SEU_ACCESS_TOKEN'` no código.

5. **Execute o servidor**:
   ```bash
   npm start
   ```
   Ou para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

6. **Acesse o site**:
   - Abra o navegador em `http://localhost:8000`

---

## 📸 Identidade Visual
O site utiliza imagens oficiais da marca, incluindo:
- Caixas de morangos cobertos com chocolate.
- Diferentes tipos de chocolates e toppings.
- Informações de entrega e consumo.

---

## 📞 Contato
- Instagram: [@_luxyberry](https://www.instagram.com/_luxyberry)  
- WhatsApp: +61 XXXX XXX XXX  
- E-mail: contato@luxyberry.com.au  

---

© _luxyberry — Made with love in QLD, Australia.
