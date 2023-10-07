import { Box, Container } from "@mui/material";
import { useState } from "react";
import { RoomType } from "../../../types/room";
import RoomTypeSelection from "./RoomTypeSelection";
import RoomList from "./RoomList";
import Filter from "./Filter";
import HeaderFiller from "../../../components/HeaderFiller";

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
        <Box sx={{ minHeight: '620px', }}>
            <Box sx={{ width: 1, bgcolor: theme => theme.palette.grey[300] }}>
                <HeaderFiller />
                <Container>

                    <Filter items={filterItems} handleItemsChange={handleFilterItemsChange} />

                    <RoomTypeSelection selected={selectedRoomType} setSelection={handleSelectionChange} />
                </Container>
            </Box>

            <Container>
                <RoomList filterItems={filterItems} selectedTypes={selectedRoomType} />
            </Container>
        </Box>
    );
}
