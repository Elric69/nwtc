const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message sent';
        userMessageDiv.innerHTML = `<img src="/static/images/user.png" alt="User"> ${userMessage}`;
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
    typingIndicator.innerHTML = `<img src="/static/images/bot.png" alt="Bot"> typing...`;
    typingIndicator.id = 'typingIndicator';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addMessage(userMessage) {
    const typingIndicator = document.getElementById('typingIndicator');
    fetch("/getData", {
            method : 'POST',
            headers:{
            'Content-Type':'application/json'
        }, 
            body: JSON.stringify({"message" : userMessage})
        })
        .then(response => response.json())
        .then(data => {
            if (typingIndicator) {
                typingIndicator.remove();
            }
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message received';
            messageDiv.innerHTML = `<img src="/static/images/bot.png"> ${data.cnt}`;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        })
        .catch(error => {
            console.log(error)
        })

}

messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});