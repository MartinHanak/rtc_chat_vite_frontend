import { Breadcrumbs, Stack, Link, Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useLocation } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
    const location = useLocation();
    const pathnames = ["", ...location.pathname.split('/').filter((x) => x)];




    return (
        <Stack component="header" direction="row" justifyContent="space-between" alignItems="center">

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


            <Box>
                <SettingsIcon />
            </Box>

        </Stack>
    );
}