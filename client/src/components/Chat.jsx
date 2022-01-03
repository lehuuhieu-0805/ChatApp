import { useState } from 'react';

function Chat({ SendMessage, HandleDisconnect, listUser }) {
    const [message, setMessage] = useState('');

    return (
        <div className="container">
            <div className="row">
                <div className="col-3" style={{ height: 440, backgroundColor: 'yellowgreen', borderStyle: 'solid' }}>
                    <h3 style={{ textAlign: 'center' }}>Chat Members</h3>
                    <ul>
                        {listUser.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-1"></div>
                <div className="col-8" style={{ height: 440, borderStyle: 'solid' }}>
                    <div style={{ display: 'grid', height: 430 }}>
                        <ul id="messagesList" style={{ overflow: 'auto' }}></ul>
                        <form style={{ alignSelf: 'end', padding: 10 }} className="row">
                            <div className="col-sm-10">
                                <input
                                    value={message}
                                    placeholder="message..."
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="col-10 form-control"
                                    style={{ marginRight: 10 }}
                                />
                            </div>
                            <button
                                className="col-sm-2 btn btn-primary"
                                onClick={(e) => {
                                    SendMessage(message);
                                    setMessage('');
                                    e.preventDefault();
                                }}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-danger"
                style={{ float: 'right', marginTop: 10 }}
                onClick={(e) => {
                    HandleDisconnect();
                    e.preventDefault();
                }}
            >
                Disconnect
            </button>
        </div>
    );
}

export default Chat;
