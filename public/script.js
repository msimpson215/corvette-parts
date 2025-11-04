const socket = io();
const log = document.getElementById("log");
const inp = document.getElementById("inp");
const send = document.getElementById("send");

// Helper: render message
function render(kind, text) {
  const row = document.createElement("div");
  row.className = "row";
  const bubble = document.createElement("div");
  bubble.className = kind;
  bubble.textContent = text;
  row.appendChild(bubble);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

// Server-sent message
socket.on("bot", (text) => render("bot", text));

// Handle user messages
send.addEventListener("click", () => {
  const msg = inp.value.trim();
  if (!msg) return;
  render("you", msg);
  socket.emit("user", msg);
  inp.value = "";
});

inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send.click();
});
