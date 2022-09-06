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
wss.on("connection", (client_socket) =>
  console.log(`============\nsocket: \n${client_socket}\n============\n`)
);
