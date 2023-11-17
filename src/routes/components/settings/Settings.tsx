import { Box, Divider } from "@mui/material";
import SettingsHeader from "./SettingsHeader";
import UserColorSettings from "./UserColorSettings";
import UsernameSettings from "./UsernameSettings";
import DisplayRandomSettings from "./DisplayRandomSettings";

interface Settings {
    closeModal: () => void;
}

export default function Settings({ closeModal }: Settings) {

    return (
        <>
            <SettingsHeader closeModal={closeModal} />
            <Box sx={{
                paddingX: 4, paddingBottom: 4,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', gap: 2
            }}>
                <Divider sx={{ marginBottom: 2 }} />
                <UsernameSettings />

                <UserColorSettings />

                <DisplayRandomSettings />
            </Box>
        </>
    );
}