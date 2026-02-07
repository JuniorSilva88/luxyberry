/* ================================
   WHATSAPP LINK - SUCCESS PAGE
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLink = document.getElementById("whatsapp-link");
  const orderRefEl = document.getElementById("orderRef");
  const nameEl = document.getElementById("customerName");

  if (!whatsappLink) return;

  const phone = "61400289803";

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const customerName = params.get("name");

  const orderRef = sessionId
    ? sessionId.substring(0, 12).toUpperCase()
    : "CONFIRMED";

  orderRefEl.textContent = orderRef;

  // 🔹 NOVO: mostra o nome se existir
  if (nameEl && customerName) {
    nameEl.textContent = customerName;
  }

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
