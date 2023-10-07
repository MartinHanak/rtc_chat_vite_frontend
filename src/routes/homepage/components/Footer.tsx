import { Box, Container, Stack } from "@mui/material";
import FAQ from "./FAQ";
import { grey } from "@mui/material/colors";

export default function Footer() {

    return (
        <Box component="footer" bgcolor={grey[300]}>
            <Container>
                <FAQ />

                <Stack>
                    Hello
                </Stack>
            </Container>
        </Box>
    );
}