import { Box, Card, Chip, IconButton, Stack } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { formatFileSize } from "../../../../../../../../util/format";

interface FileChip {
    fileName: string;
    fileSize: number;
    onDelete: () => void;
}

export default function FileChip({ fileName, fileSize, onDelete }: FileChip) {
    return (
        <Stack
            component={Card}
            sx={{
                position: 'relative',
                width: 1,
                maxWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
                gap: 0,
                overflow: 'visible',
                backgroundColor: theme => theme.palette.background.tertiaryDefault
            }}>
            <Box sx={{ flex: 1, maxWidth: 'calc(100% - 48px)', wordWrap: 'break-word' }}>{fileName}</Box>



            {null && <Chip label={formatFileSize(fileSize)} sx={{
                backgroundColor: theme => theme.palette.background.light,
                position: "absolute",
                right: '48px',
                top: '-16px '
            }} />}

            <Stack sx={{ flexShrink: 0, display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', marginRight: 1 }}>

                <IconButton onClick={onDelete}>
                    <ClearIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}