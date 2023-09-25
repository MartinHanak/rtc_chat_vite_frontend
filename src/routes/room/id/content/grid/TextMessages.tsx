import { useSocketContext } from "../../context/SocketContext";
import TextMessage from "./TextMessage";

export default function TextMessages() {

    const { messages } = useSocketContext();

    return (
        <>
            {messages.map((message) => {
                return (
                    <TextMessage
                        key={`${message.fromSocketId}_${message.time}`}
                        username={message.username}
                        message={message.message}
                        time={message.time}
                    />
                );
            })}
        </>
    );
}