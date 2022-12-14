import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const port = 3000;

// http server
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// and ws server at the same time
const wss = new WebSocket.Server({ server });
const clnt_sockets = [];
wss.on("connection", (client_socket) => {
  console.log("Connected to a browser ✅");
  clnt_sockets.push(client_socket);

  client_socket["nickname"] = "Anon";
  client_socket.on("close", () =>
    console.log("Disconnected from a browser. ❌")
  );
  client_socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        clnt_sockets.forEach((c_socket) =>
          c_socket.send(`${client_socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        client_socket["nickname"] = message.payload;
        break;
      default:
        break;
    }
  });
  client_socket.send("hello!!!");
});
