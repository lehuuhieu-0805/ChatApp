import { useState } from 'react';

const Form = ({ JoinRoom }) => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    return (
        <form>
            <input
                placeholder="UserName"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <br />
            <input
                placeholder="RoomId"
                value={roomId}
                onChange={(e) => {
                    setRoomId(e.target.value);
                }}
            />
            <br />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    JoinRoom(username, roomId);
                    setUsername('');
                    setRoomId('');
                }}
            >
                Submit
            </button>
        </form>
    );
};

export default Form;
