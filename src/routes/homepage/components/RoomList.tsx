import { Grid } from "@mui/material";
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
        <Grid container spacing={2}>
            <Grid item xs="auto">
                <NewRoomCard />
            </Grid>

            {status === 'loading' ?
                <Grid item xs="auto">
                    <LoadingRoomCard />
                </Grid>
                :
                <>
                    {roomTypeDisplayOrder.map((type) => {
                        if (selectedTypes.includes(type)) {

                            return rooms
                                .filter((room) => room.type === type)
                                .map((room) => (
                                    <Grid item xs="auto" key={room.name}>
                                        <RoomCard room={room} />
                                    </Grid>
                                ));

                        }
                    })}
                </>
            }
        </Grid>
    );
}