const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message sent';
        userMessageDiv.innerHTML = `<img src="https://i.im.ge/2024/10/27/k8yZZf.1000040037.png" alt="User"> ${userMessage}`;
        chatContainer.appendChild(userMessageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        const newMessage = messageInput.value;
        messageInput.value = '';
        showTypingIndicator();
        setTimeout(addMessage(newMessage), 1500);
    }
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message received typing-indicator';
    typingIndicator.innerHTML = `<img src="https://i.im.ge/2024/10/27/k8ykbW.1000040036.png" alt="Bot"> typing...`;
    typingIndicator.id = 'typingIndicator';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addMessage(userMessage) {
    const typingIndicator = document.getElementById('typingIndicator');
    try {
        fetch(`http://api.brainshop.ai/get?bid=180356&key=6DRvcrqFlApaokis&uid=1&msg=${encodeURIComponent(userMessage)}`)
        .then(response => response.json())
        .then(data => {
            if (typingIndicator) {
                typingIndicator.remove();
            }
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message received';
            messageDiv.innerHTML = `<img src="https://i.im.ge/2024/10/27/k8ykbW.1000040036.png"> ${data.cnt}`;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        })
        .catch(error => {
            console.log(error)
        })
        
    } catch (error) {
        console.log(error)
    }


}

messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
