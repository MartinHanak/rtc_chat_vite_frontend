import Users from "./Users";
import ChatOverlay from "./grid/ChatOverlay";

export function TextChat() {

    return (<>
        <Users offset={0} />
        <ChatOverlay offset={0} overlay={false} />
    </>
    );
}