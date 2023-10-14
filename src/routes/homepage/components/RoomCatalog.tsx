import { Box, Container, Typography } from "@mui/material";
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
        <Box sx={{ minHeight: '960px', }}>
            <Box sx={{ width: 1, bgcolor: theme => theme.palette.background.secondaryDefault }}>

                <HeaderFiller />

                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <Typography variant="h3" fontWeight={'bold'} >
                        Enter a Room and Chat Away!
                    </Typography>
                </Container>

                <Container sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'start' },
                    paddingBottom: 8,

                }}>

                    <Box sx={{ flexGrow: 1, flexShrink: 0, flexBasis: { xs: '100%', sm: '50%' } }}>
                        <Typography variant="h5" color="text.secondary" fontSize={'1.2rem'} sx={{ paddingX: 2, marginBottom: 1 }}>
                            Interested in specific topics?
                        </Typography>
                        <Filter items={filterItems} handleItemsChange={handleFilterItemsChange} />
                    </Box>

                    <Box sx={{
                        flexGrow: 1, flexShrink: 0, flexBasis: { xs: '100%', sm: '50%' },
                        paddingLeft: { xs: 0, sm: 4 },
                        paddingTop: { xs: 4, sm: 0 },
                    }}   >
                        <Typography variant="h5" color="text.secondary" fontSize={'1.2rem'} sx={{ paddingX: 2, marginBottom: 1 }}>
                            How Would You Like to Chat?
                        </Typography>
                        <RoomTypeSelection selected={selectedRoomType} setSelection={handleSelectionChange} />
                    </Box>
                </Container>
            </Box>

            <Container sx={{ marginTop: 4 }}>
                <RoomList filterItems={filterItems} selectedTypes={selectedRoomType} />
            </Container>
        </Box>
    );
}
