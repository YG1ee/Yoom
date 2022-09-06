const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const server_socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

server_socket.addEventListener("open", () => {
  console.log("Connected to Server! ✅");
});

server_socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

server_socket.addEventListener("close", () => {
  console.log("Disconnected from Server. ❌");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  server_socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  server_socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);
