import { Stack } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import CloseSettings from "./CloseSettings";

interface SettingsHeader {
    closeModal: () => void;
}

export default function SettingsHeader({ closeModal }: SettingsHeader) {
    return (
        <Stack direction={"row"}>
            <ThemeToggle />
            <CloseSettings closeModal={closeModal} />
        </Stack>
    );
}