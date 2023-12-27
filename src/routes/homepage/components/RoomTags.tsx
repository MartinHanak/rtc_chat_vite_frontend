import { Box, Chip } from "@mui/material";

interface RoomTags {
    tags: string[];
}

export default function RoomTags({ tags }: RoomTags) {
    if (tags.length === 0) return null;

    return (<Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, paddingBottom: 1, paddingTop: 2 }}>
        {tags.map((tag, index) => {
            return <Chip label={tag} key={`tag${index}`} sx={{
                height: '24px',
                borderRadius: '5px',
                fontWeight: '500',
                '& .MuiChip-label': {
                    paddingY: 0,
                    paddingX: 1
                }
            }} />;
        })}
    </Box>);
}