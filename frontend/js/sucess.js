/* ================================
   WHATSAPP LINK - SUCCESS PAGE
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLink = document.getElementById("whatsapp-link");
  const orderRefEl = document.getElementById("orderRef");

  if (!whatsappLink) return;

  const phone = "61400289803"; // mesmo número que você já usa

  // LÊ O session_id DA URL (enviado pelo Stripe)
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  // Mostra algo visual para o cliente
  const orderRef = sessionId
    ? sessionId.substring(0, 12).toUpperCase()
    : "CONFIRMED";

  orderRefEl.textContent = orderRef;

  // MENSAGEM — mesma ideia do seu main.js
  const message =
    "Hello LuxyBerry 👋\n" +
    "My payment was successful.\n\n" +
    "Order reference: " + orderRef;

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  whatsappLink.href = url;
});
