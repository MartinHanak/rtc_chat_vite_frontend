import { Box, Grid } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface EmptyMainGridItem {
    dragId: string;
    width: number;
}

export default function EmptyMainGridItem({ dragId, width }: EmptyMainGridItem) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: dragId });

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
            <Box sx={{
                width: 1,
                aspectRatio: ' 16 / 9'
            }}>
            </Box>
        </Grid>
    );
}