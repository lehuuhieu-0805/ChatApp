import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Lobby from './components/Lobby';

function App() {
    const [connection, setConnection] = useState(null);
    const [listUser, setListUser] = useState([]);

    const SendMessage = (message) => {
        connection.invoke('SendMessage', { message }).catch((error) => console.log('send message: ', error));
    };

    const JoinRoom = async (username, roomId) => {
        const connection = new HubConnectionBuilder().withUrl('https://localhost:5001/chat').configureLogging(LogLevel.Information).build();

        setConnection(connection);

        try {
            await connection.start();
            console.log('Connected!');
        } catch (error) {
            console.log('Connect failed: ', error);
        }

        connection.on('ReceiveMessage', (user, message) => {
            let li = document.createElement('li');
            document.getElementById('messagesList').appendChild(li);
            li.textContent = `${user} - ${message}`;

            let scroll = document.getElementById('messagesList');
            scroll.scrollTop = scroll.scrollHeight;
        });

        connection.on('UserInRoom', (user) => {
            setListUser(user, ...listUser);
        });

        await connection.invoke('JoinRoom', { username, roomId });
    };

    const HandleDisconnect = () => {
        connection
            .stop()
            .then(() => setConnection(null))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: 20 }}>ChatApp</h1>
            {!connection ? <Lobby JoinRoom={JoinRoom} /> : <Chat SendMessage={SendMessage} HandleDisconnect={HandleDisconnect} listUser={listUser} />}
        </>
    );
}

export default App;
