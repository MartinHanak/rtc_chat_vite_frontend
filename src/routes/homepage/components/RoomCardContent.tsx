import { CardContent, Tooltip, Typography } from "@mui/material";
import RoomCardActions from "./RoomCardActions";
import { useMemo } from "react";

interface RoomCardContent {
    name: string;
    description: string;
}

const maxCharLimit = 90;

export default function RoomCardContent({ name, description }: RoomCardContent) {

    const showMore = useMemo(() => {
        if (description.length > maxCharLimit) {
            return true;
        } else {
            return false;
        }
    }, [description]);


    return (
        <>
            <CardContent sx={{ width: 1, overflow: 'hidden', flexGrow: 1 }}>

                <Tooltip title={name} placement="top-start">
                    <Typography variant="h5" component="div"
                        textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}
                    >
                        {name}
                    </Typography>
                </Tooltip>

                <Typography
                    variant="body2" color="text.secondary" component="div"
                    sx={{
                        overflowWrap: 'break-word',
                    }}

                >
                    {description.slice(0, maxCharLimit) + (showMore ? '...' : '')}
                </Typography>




            </CardContent>

            <RoomCardActions showMore={showMore} />
        </>
    );

}
