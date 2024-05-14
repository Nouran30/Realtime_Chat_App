const socket = io();
const messageForm = document.querySelector("#message-form");
const messageInput = messageForm.querySelector("input");
const messagesDiv = document.querySelector("#messages");

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("sendMessage", message, () => {
            messageInput.value = "";
            messageInput.focus();
        });
    }
});

socket.on("message", (message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});