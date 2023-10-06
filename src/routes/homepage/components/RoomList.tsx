import { Grid } from "@mui/material";
import { useAvailableRoomsContext } from "../../components/AvailableRoomsContext";
import { RoomType } from "../../../types/room";
import NewRoomCard from "./NewRoomCard";
import LoadingRoomCard from "./LoadingRoomCard";
import RoomCard from "./RoomCard";
import { useMemo } from "react";

interface RoomList {
    filterItems: string[];
    selectedTypes: RoomType[];
}

export default function RoomList({ filterItems, selectedTypes }: RoomList) {

    const roomTypeDisplayOrder: RoomType[] = ['video', 'audio', 'text'];

    const { rooms, status } = useAvailableRoomsContext();

    const roomsFilteredByType = useMemo(() => {

        return rooms.filter((room) => selectedTypes.includes(room.type));

    }, [selectedTypes, rooms]);


    const roomsFilteredByFilterItems = useMemo(() => {

        return roomsFilteredByType.filter((room) => {
            if (filterItems.length > 0) {
                return filterItems.some((item) => room.name.includes(item) || room.description.includes(item));
            } else {
                return true;
            }
        });

    }, [roomsFilteredByType, filterItems]);

    return (
        <Grid container spacing={2}>
            <NewRoomCard />

            {status === 'loading' ?
                <LoadingRoomCard />
                :
                <>
                    {roomTypeDisplayOrder.map((type) => {
                        if (selectedTypes.includes(type)) {

                            return roomsFilteredByFilterItems
                                .filter((room) => room.type === type)
                                .map((room) => (
                                    <RoomCard room={room} key={room.name} />
                                ));

                        }
                    })}
                </>
            }
        </Grid>

    );
}