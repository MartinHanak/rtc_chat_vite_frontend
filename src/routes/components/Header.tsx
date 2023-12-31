import { Breadcrumbs, Stack, Link, Container, Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LocalSettingsModal } from "./LocalSettingsModal";
import RandomRoom from "../room/id/components/content/grid_overlay/RandomRoom";
import { useLocalSettingsContext } from "./LocalSettingsContext";
import { useAvailableRoomsContext } from "./AvailableRoomsContext";

export default function Header() {
    const location = useLocation();
    const pathnames = ["", ...location.pathname.split('/').filter((x) => x)];

    const { displayRandomRoom } = useLocalSettingsContext();
    const { rooms } = useAvailableRoomsContext();

    return (
        <Box sx={{ width: 1, position: 'absolute', top: 0, left: 0 }}>
            <Container sx={{}}>
                <Stack sx={{ position: 'relative' }} component="header" direction="row" justifyContent="space-between" alignItems="center">

                    <Breadcrumbs aria-label="breadcrumb">
                        {pathnames.map((name, index) => {

                            let pathTo = pathnames.slice(0, index + 1).join('/');

                            if (name === "") {
                                name = 'Home';
                                pathTo = "/";
                            }

                            return (
                                <Link
                                    key={name}
                                    component={RouterLink}
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="inherit"
                                    to={pathTo}
                                >
                                    {pathTo === '/' && <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                                    {decodeURIComponent(name)}
                                </Link>
                            );

                        })}
                    </Breadcrumbs>


                    <LocalSettingsModal />


                    {displayRandomRoom !== 'false' && rooms.length > 1 &&
                        <RandomRoom />
                    }
                </Stack>
            </Container>
        </Box>
    );
}