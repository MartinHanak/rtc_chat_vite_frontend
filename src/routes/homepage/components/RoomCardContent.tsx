import { Box, Button, CardContent, Collapse, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";

interface RoomCardContent {
    name: string;
    description: string;
}

export default function RoomCardContent({ name, description }: RoomCardContent) {
    const [expandHorizontal, setExpandHorizontal] = useState(false);
    const [expandVertical, setExpandVertical] = useState(false);

    const toggleCollapse = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setExpandHorizontal((prev) => !prev);
    };


    return (
        <CardContent sx={{ position: 'relative', overflow: 'visible' }}>



            <Collapse in={expandHorizontal} collapsedSize={'50px'} orientation={"horizontal"}
                addEndListener={() => setExpandVertical((prev) => !prev)}>
                <Collapse in={expandVertical} collapsedSize={'50px'} orientation={"vertical"}>

                    <Box sx={{ position: 'absolute', top: theme => theme.spacing(2), left: theme => theme.spacing(2), width: '500px', height: '200px', overflow: 'hidden', backgroundColor: 'white', zIndex: 10 }}>
                        <Button onClick={toggleCollapse}>Toggle expand</Button>
                        <Typography sx={{}}>{name}</Typography>
                        <Typography sx={{}}>{description}</Typography>
                    </Box>

                </Collapse>
            </Collapse>

        </CardContent>
    );
}