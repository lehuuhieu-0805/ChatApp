import Form from './Form';

function Lobby({ JoinRoom }) {
    return (
        <>
            <div>
                <Form JoinRoom={JoinRoom} />
            </div>
        </>
    );
}

export default Lobby;
