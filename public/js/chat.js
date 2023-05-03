socket.on('chatMessage', message => {
    createUserMessage(message);
});
socket.on('systemMessage', message => {
    createSystemMessage(message);
});

// Send a message to the server
const sendUserMessage = document.getElementById('sendUserMessage');
sendUserMessage.addEventListener('keyup', event => {
    event.preventDefault();
    if (event.keyCode === 13){
        socket.emit('userMessage', {
            'name': USERNAME,
            'data': sendUserMessage.value,
            'date': "05/01"
        });
        sendUserMessage.value = '';
    }
});

// Output a user message to DOM
const chat__area = document.getElementById('chatArea');

function createUserMessage(message) {
    const msg = document.createElement('div');
    msg.classList.add('message'); 
    msg.innerHTML = `
        <p class = "info">
            ${message.name} <span>${message.date}</span>
        </p>
        <p class = "text">
            ${message.data}
        </p>
    `;
    document.body.appendChild(msg);
}

// Output a system message to DOM
function createSystemMessage(message) {
    const sys = document.createElement('div');
    sys.classList.add('system'); 
    sys.innerHTML = `
        <p class = "text">
            ${message}
        </p>
    `;
    document.body.appendChild(sys);
}

