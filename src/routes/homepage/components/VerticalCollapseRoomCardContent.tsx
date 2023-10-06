import { Box, Card, CardContent, Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState, MouseEvent } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface RoomCardContent {
    name: string;
    description: string;
}


export default function VerticalCollapseRoomCardContent({ name, description }: RoomCardContent) {

    const descriptionContainerRef = useRef<HTMLDivElement>(null);

    const [showMore, setShowMore] = useState(false);
    const [expand, setExpand] = useState(false);


    useLayoutEffect(() => {

        if (!descriptionContainerRef.current) {
            return;
        }

        if (descriptionContainerRef.current.clientHeight < descriptionContainerRef.current?.scrollHeight) {
            setShowMore(true);
        }

    }, [descriptionContainerRef]);

    const toggleCollapse = (e: MouseEvent<HTMLDivElement>) => {
        console.log('Toggle collapse');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setExpand((prev) => !prev);
    };

    return (
        <CardContent sx={{ position: 'relative', overflow: 'visible', width: 1, height: 1, padding: 0 }}>

            <Tooltip title={name} placement="top-start">
                <Typography variant="h5" component="div"
                    textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}
                    sx={{
                        paddingX: 2,
                        marginBottom: 1
                    }}
                >
                    {name}
                </Typography>
            </Tooltip>

            <Box sx={{ position: 'relative', overflow: 'visible', width: 1, height: 'calc(100% - 40px)' }}>
                <Collapse
                    in={expand}
                    component={Card}
                    orientation="vertical"
                    sx={{
                        position: 'absolute', top: 0, left: 0,
                        width: 1,
                        paddingX: 2, paddingY: 2,
                        backgroundColor: theme => theme.palette.background.default
                    }}
                    collapsedSize={'100%'}
                >
                    <Typography
                        ref={descriptionContainerRef}
                        variant="body2" color="text.secondary" component="div"
                        sx={{ width: 1, overflowWrap: 'break-word' }}
                    >
                        {description}
                    </Typography>
                </Collapse>

                {showMore && <IconButton
                    sx={{
                        position: 'absolute', right: 0, bottom: 0,
                        backgroundColor: theme => theme.palette.background.default
                    }}
                    component="div"
                    onClick={toggleCollapse}
                >
                    <ExpandMoreIcon />
                </IconButton>}
            </Box>

        </CardContent>
    );

}