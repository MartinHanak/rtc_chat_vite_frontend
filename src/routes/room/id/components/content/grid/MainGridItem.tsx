import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../../types/user";
import VideoAudioChat from "../video_audio/VideoAudioChat";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useLocalStreamContext } from "../../context/LocalStreamProvider";

interface MainGridItem {
    dragId: string;
    width: number;
    streamInfo: combinedUserState;
}

export default function MainGridItem({ dragId, width, streamInfo }: MainGridItem) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: dragId });

    const { streamRef } = useLocalStreamContext();

    return (
        <Grid item
            xs={width}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}>
            <VideoAudioChat username={streamInfo.username} socketId={streamInfo.socketId} stream={streamInfo.stream} muted={streamInfo.stream === streamRef?.current} />
        </Grid>
    );
}