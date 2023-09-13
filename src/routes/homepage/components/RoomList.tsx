import { Box } from "@mui/material";
import { useAvailableRoomsContext } from "../../components/AvailableRoomsContext";
import { RoomType } from "../../../types/room";
import NewRoomCard from "./NewRoomCard";
import LoadingRoomCard from "./LoadingRoomCard";
import RoomCard from "./RoomCard";

interface RoomList {
    selectedTypes: RoomType[];
}

export default function RoomList({ selectedTypes }: RoomList) {
    const { rooms, status } = useAvailableRoomsContext();


    const roomTypeDisplayOrder: RoomType[] = ['video', 'audio', 'text'];

    return (
        <Box>
            <NewRoomCard />

            {status === 'loading' ?
                <LoadingRoomCard />
                :
                <>
                    {roomTypeDisplayOrder.map((type) => {
                        if (selectedTypes.includes(type)) {

                            return rooms
                                .filter((room) => room.type === type)
                                .map((room) => <RoomCard key={room.name} room={room} />);

                        }
                    })}
                </>
            }
        </Box>
    );
}