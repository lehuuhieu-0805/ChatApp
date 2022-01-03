import { useState } from 'react';

const Form = ({ JoinRoom }) => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    return (
        <div className="mx-auto" style={{ width: '15rem' }}>
            <form>
                <input
                    className="mb-3 form-control"
                    placeholder="UserName"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    className="mb-3 form-control"
                    placeholder="RoomId"
                    value={roomId}
                    onChange={(e) => {
                        setRoomId(e.target.value);
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            JoinRoom(username, roomId);
                            setUsername('');
                            setRoomId('');
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
