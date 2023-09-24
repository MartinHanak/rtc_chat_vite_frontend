import { Box, Button, Container, Stack } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

interface GridDisplayControls {
    streams: Map<string, combinedUserState>;
}

export default function GridDisplayControls({ streams }: GridDisplayControls) {
    return (
        <Box sx={{
            position: 'fixed', bottom: '0', left: 0, width: '100%', height: '20%',
            backgroundColor: 'red',
        }}>
            <Container sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <Button sx={{ height: '100%' }}>
                    <PlayArrowRoundedIcon fontSize="large" sx={{ transform: 'rotate(180deg)' }} />
                </Button>

                <Stack>
                    hello
                </Stack>

                <Button sx={{ height: '100%' }}>
                    <PlayArrowRoundedIcon fontSize="large" />
                </Button>
            </Container>
        </Box>
    );
}