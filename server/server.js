// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ✅ Friendly greeting (you can change this anytime)
const GREETING = process.env.GREETING
  || "Hello, welcome to Walmart Groceries. How can I assist you today?";

// Serve the static files
app.use(express.static(path.join(__dirname, "public")));

// WebSocket connection logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  // Send initial greeting
  socket.emit("bot", GREETING);

  // Echo or process messages
  socket.on("user", (msg) => {
    console.log("User:", msg);

    // For now, simple echo
    const response = `You said: "${msg}". I can help you find groceries or checkout when ready.`;
    socket.emit("bot", response);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// Run the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Walmart Assistant running on http://localhost:${PORT}`);
});
