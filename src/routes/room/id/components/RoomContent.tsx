import { Room } from "../../../../types/room";
import { TextChat } from "./content/text_only/TextChat";
import GridView from "./content/grid/GridView";

interface RoomContent {
    room: Room;
}

export default function RoomContent({ room }: RoomContent) {
    return (
        <>
            {room.type === 'text' && <TextChat />}

            {(room.type === 'video' || room.type == 'audio') && <GridView />}
        </>
    );
}