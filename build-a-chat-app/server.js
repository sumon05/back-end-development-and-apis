import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
const server = http.createServer((req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(data);
  });
});
const wss = new WebSocketServer({ server });
//function to send a message to all connected clients.
function broadcast(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    client.send(data);
  });
}
wss.on("connection", (socket, req)=>{
    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username",
    );
     // Tell everyone that this user joined
    broadcast({
      type: "system",
      text: `${username} joined`,
    });
// Receive and broadcast chat messages
  socket.on("message", (data) => {
    const { username, text } = JSON.parse(data);

    broadcast({
      type: "chat",
      username,
      text,
    });
  });
  // Tell everyone when this user leaves
  socket.on("close", () => {
    broadcast({
      type: "system",
      text: `${username} left`,
    });
  });
});


const PORT = 3001;
server.listen(PORT, () => {
  console.log("Chat server running at http://localhost:3001");
});