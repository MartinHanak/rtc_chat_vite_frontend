import Users from "../grid_overlay/Users";
import ChatOverlay from "../grid/ChatOverlay";

export function TextChat() {

    return (<>
        <Users offset={0} />
        <ChatOverlay offset={0} overlay={false} />
    </>
    );
}