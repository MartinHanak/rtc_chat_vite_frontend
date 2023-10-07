import { Box, Container, Link, Stack, Typography } from "@mui/material";
import FAQ from "./FAQ";
import { grey } from "@mui/material/colors";

export default function Footer() {

    return (
        <Box component="footer" bgcolor={grey[300]}>
            <Container>
                <FAQ />

                <Stack sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography color="black">
                        Made by&nbsp;
                        <Link href="https://martinhanak.com" target="_blank">
                            Martin Hanák
                        </Link>
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}