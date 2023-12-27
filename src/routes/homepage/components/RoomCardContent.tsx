import { CardContent, Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import RoomTags from "./RoomTags";

interface RoomCardContent {
    name: string;
    description: string;
    tags: string[];
    maxCharLimit: number;
}


export default function RoomCardContent({ name, description, tags, maxCharLimit }: RoomCardContent) {

    const showMore = useMemo(() => {
        if (description.length > maxCharLimit) {
            return true;
        } else {
            return false;
        }
    }, [description, maxCharLimit]);


    return (
        <CardContent sx={{ width: 1, overflow: 'hidden', flexGrow: 1, paddingBottom: 0 }}>

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
                {description === '' ?
                    '(no description)'
                    :
                    description.slice(0, maxCharLimit) + (showMore ? '...' : '')}
            </Typography>


            <RoomTags tags={tags} />

        </CardContent>


    );

}
