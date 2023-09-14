import { Room } from "../../../types/room";
import RoomContent from "./RoomContent";
import RoomContext from "./RoomContext";

interface RoomComponent {
    room: Room;
}

export default function Room({ room }: RoomComponent) {
    return (
        <RoomContext>
            <RoomContent />
        </RoomContext>
    );
}