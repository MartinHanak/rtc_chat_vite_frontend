import Users from "../grid/overlay/Users";
import ChatOverlay from "../grid/overlay/chat/ChatOverlay";

export function TextChat() {

    return (<>
        <Users offset={0} />
        <ChatOverlay offset={0} overlay={false} />
    </>
    );
}