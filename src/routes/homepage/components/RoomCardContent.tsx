import { Box, Button, Card, CardContent, Collapse, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";

interface RoomCardContent {
    name: string;
    description: string;
}

export default function RoomCardContent({ name, description }: RoomCardContent) {
    const [expandHorizontal, setExpandHorizontal] = useState(false);
    const [expandVertical, setExpandVertical] = useState(false);
    const [shift, setShift] = useState(false);

    const toggleCollapse = (e: MouseEvent<HTMLDivElement>) => {
        console.log('Toggle collapse');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setExpandHorizontal((prev) => !prev);
    };


    return (
        <CardContent sx={{ position: 'relative', overflow: 'visible', width: 1, height: 1 }}>



            <Collapse in={expandHorizontal} collapsedSize={'100%'} orientation={"horizontal"}
                component={Card}
                addEndListener={() => setExpandVertical((prev) => !prev)}
                sx={{
                    position: 'absolute', top: theme => theme.spacing(0),
                    left: shift ? '-20px' : theme => theme.spacing(0),
                    zIndex: shift ? 999 : 10,
                    boxShadow: shift ? theme => theme.shadows[1] : 'none',
                }}
            >

                <Collapse in={expandVertical} collapsedSize={'80px'} orientation={"vertical"} timeout={500}
                    addEndListener={() => setShift((prev) => !prev)}
                >


                    <Box sx={{
                        width: '200px', height: '200px',
                        backgroundColor: theme => theme.palette.background.paper,
                        zIndex: 10,
                        paddingX: theme => theme.spacing(2),
                        paddingTop: theme => theme.spacing(1),
                        paddingBottom: theme => theme.spacing(2),
                        marginTop: theme => theme.spacing(1),
                        borderRadius: theme => theme.shape.borderRadius
                    }}>
                        <Button component="div" onClick={toggleCollapse}>Toggle expand</Button>
                        <Typography sx={{}}>{name}</Typography>
                        <Typography sx={{}}>{description}</Typography>
                    </Box>

                </Collapse>
            </Collapse>

        </CardContent>
    );
}