const socket = io();
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("form-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage('You Joined!!',"alignCenter");
socket.emit("new-user", name);

socket.on('chat-message', data => {
    console.log("message received -> "+ data.name + " : " + data.message);
    appendMessage(`${data.name}: ${data.message}`, "alignLeft");
});

socket.on('user-connected', data => {
    // console.log("message received -> "+ data);
    appendMessage(`${data} joined!!`, "alignCenter");
})

messageForm.addEventListener('submit', e => {
    // console.log("message sent -> "+ e);
    e.preventDefault();
    const message = messageInput.value;
    appendMessage("You: "+message, "alignRight");
    console.log("message sent -> "+ message);
    socket.emit('send-chat-message', message);
    messageInput.value = "";
    // messageContainer.scrollTop = messageContainer.scrollHeight;

});

function appendMessage(message, displayPosition){
    const element = document.createElement('div');
    element.innerText=message;
    // element.style.cssText = "display: flex,justify-content: flex-end";
    // element.style.display= "flex";
    // element.style.justifyContent= displayPosition == "alignRight" ? "flex-end" : "flex-start";
    element.classList.add("message-position");
    element.classList.add( displayPosition == "alignRight" ? "message-position-right" : displayPosition == "alignLeft"? "message-position-left": "message-position-center");
    messageContainer.append(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}