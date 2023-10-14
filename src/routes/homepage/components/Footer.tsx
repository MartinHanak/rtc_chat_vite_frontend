import { Box, Container, Link, Stack, Typography } from "@mui/material";
import FAQ from "./FAQ";

export default function Footer() {

    return (
        <Box component="footer" sx={{
            bgcolor: theme => theme.palette.background.secondaryDefault,
            marginTop: 4
        }}>
            <Container>
                <FAQ />

                <Stack sx={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    paddingBottom: 6,
                    paddingTop: 24
                }}>
                    <Typography>
                        Made by&nbsp;
                        <Link href="https://martinhanak.com" target="_blank" sx={{
                            fontWeight: 700,
                            color: theme => theme.palette.text.primary,
                            textDecorationColor: theme => theme.palette.text.primary,
                            textDecorationThickness: '2px',
                            textUnderlineOffset: '4px',
                            "&:hover": {
                                color: theme => theme.palette.primary.main
                            }
                        }}>
                            Martin Hanák
                        </Link>
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}