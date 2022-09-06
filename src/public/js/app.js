const server_socket = new WebSocket(`ws://${window.location.host}`);

server_socket.addEventListener("open", () => {
  console.log("Connected to Server!");
});

server_socket.addEventListener("message", (message) => {
  console.log("Just got this:", message.data, "from the server!");
});

server_socket.addEventListener("close", () => {
  console.log("Disconnected from Server.");
});
