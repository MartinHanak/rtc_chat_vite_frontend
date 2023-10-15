import { Stack, Typography } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import CloseSettings from "./CloseSettings";

interface SettingsHeader {
    closeModal: () => void;
}

export default function SettingsHeader({ closeModal }: SettingsHeader) {
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}
            sx={{ position: 'relative' }}
        >
            <ThemeToggle />
            <Typography variant="h4" sx={{ alignSelf: 'center', paddingTop: 4, paddingBottom: 1 }}>Settings</Typography>
            <CloseSettings closeModal={closeModal} />
        </Stack>


    );
}