import express from "express";
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
const handleListen = () => console.log(`Listening on http://localhost:${port}`);
server.listen(port, handleListen);

// and ws server at the same time
const wss = new WebSocket.Server({ server });
const handleConnection = (client_socket) =>
  console.log(`============\nsocket: \n${client_socket}\n============\n`);
wss.on("connection", handleConnection);
