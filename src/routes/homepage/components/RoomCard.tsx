import { Room } from "../../../types/room";
import RoomCardContainer from "./RoomCardContainer";

interface RoomCard {
    room: Room;
}
export default function RoomCard({ room }: RoomCard) {

    return (
        <RoomCardContainer>
            {room.name}
        </RoomCardContainer>
    );

}