import { Box } from "@mui/material";
import { useState } from "react";
import { RoomType } from "../../../types/room";
import RoomTypeSelection from "./RoomTypeSelection";
import RoomList from "./RoomList";
import Filter from "./Filter";

export default function RoomCatalog() {

    const [selectedRoomType, setSelectedRoomType] = useState<RoomType[]>(["video", "audio", "text"]);

    function handleSelectionChange(_event: React.MouseEvent<HTMLElement>, input: RoomType[]) {
        setSelectedRoomType(input);
    }

    const [filterItems, setFilterItems] = useState<string[]>([]);

    const handleFilterItemsChange = (items: string[]) => {
        setFilterItems(items);
    };

    return (
        <Box>
            <Filter items={filterItems} handleItemsChange={handleFilterItemsChange} />

            <RoomTypeSelection selected={selectedRoomType} setSelection={handleSelectionChange} />

            <RoomList filterItems={filterItems} selectedTypes={selectedRoomType} />
        </Box>
    );
}
