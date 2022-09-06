const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const server_socket = new WebSocket(`ws://${window.location.host}`);

server_socket.addEventListener("open", () => {
  console.log("Connected to Server! ✅");
});

server_socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
});

server_socket.addEventListener("close", () => {
  console.log("Disconnected from Server. ❌");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  server_socket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
