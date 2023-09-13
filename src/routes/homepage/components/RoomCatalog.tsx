import { Box } from "@mui/material";
import { useState } from "react";
import { RoomType } from "../../../types/room";
import RoomTypeSelection from "./RoomTypeSelection";
import RoomList from "./RoomList";

export default function RoomCatalog() {

    const [selectedRoomType, setSelectedRoomType] = useState<RoomType[]>(["video", "audio", "text"]);

    function handleSelectionChange(event: React.MouseEvent<HTMLElement>, input: RoomType[]) {
        setSelectedRoomType(input);
    }

    return (
        <Box>
            <RoomTypeSelection selected={selectedRoomType} setSelection={handleSelectionChange} />

            <RoomList selectedTypes={selectedRoomType} />
        </Box>
    );
}
