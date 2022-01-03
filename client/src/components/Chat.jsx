import { useState } from 'react';

function Chat({ SendMessage, HandleDisconnect }) {
    const [message, setMessage] = useState('');
    return (
        <div>
            <ul id="messagesList"></ul>
            <form>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <br />
                <button
                    onClick={(e) => {
                        SendMessage(message);
                        setMessage('');
                        e.preventDefault();
                    }}
                >
                    Send
                </button>
                <br />
                <button
                    onClick={(e) => {
                        HandleDisconnect();
                        e.preventDefault();
                    }}
                >
                    Disconnect
                </button>
            </form>
        </div>
    );
}

export default Chat;
