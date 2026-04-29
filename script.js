const prices = {
  student: "49 EUR",
  hochschule: "99 EUR",
  kommune: "149 EUR",
  firma: "249 EUR",
};

const ticketSelect = document.querySelector("#ticket-select");
const selectedPrice = document.querySelector("#selected-price");
const form = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");

function setTicket(ticket) {
  if (!prices[ticket]) return;
  ticketSelect.value = ticket;
  selectedPrice.textContent = prices[ticket];
}

ticketSelect.addEventListener("change", (event) => {
  setTicket(event.target.value);
});

document.querySelectorAll("[data-ticket]").forEach((link) => {
  link.addEventListener("click", () => {
    setTicket(link.dataset.ticket);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const ticket = data.get("ticket");
  const subject = "Buchungsanfrage LOC-IN Workshop Alge trifft Innovation";
  const body = [
    "Hallo LOC-IN,",
    "",
    "ich moechte den Workshop am 8. Juni 2026 von 10:00 bis 15:00 Uhr buchen.",
    "",
    `Name: ${data.get("name")}`,
    `Organisation: ${data.get("organisation")}`,
    `E-Mail: ${data.get("email")}`,
    `Zielgruppe: ${ticketSelect.options[ticketSelect.selectedIndex].text}`,
    `Preis: ${prices[ticket]}`,
    "",
    `Nachricht: ${data.get("message") || "-"}`,
  ].join("\n");

  window.location.href = `mailto:kontakt@loc-in.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const name = data.get("name") || "Vielen Dank";
  formNote.textContent = `${name}, Ihre E-Mail-Anfrage wurde vorbereitet. LOC-IN meldet sich mit den naechsten Schritten.`;
  form.reset();
  setTicket("student");
});
