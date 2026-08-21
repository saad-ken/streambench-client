document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value;

    if (topic && message) {
        sendMessage(topic, message);
    }
});

function sendMessage(topic, message) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/send', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.success) {
                const newMessage = document.createElement('li');
                newMessage.textContent = `${response.topic} - ${response.message}`;
                document.getElementById('messages').appendChild(newMessage);
            } else {
                alert('Failed to send message');
            }
        }
    };
    xhr.send(JSON.stringify({ topic, message }));
}

document.getElementById('messages').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.remove();
    }
});
