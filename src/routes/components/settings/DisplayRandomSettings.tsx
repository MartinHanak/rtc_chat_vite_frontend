import { Checkbox, FormControlLabel, Stack, Tooltip } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";

export default function DisplayRandomSettings() {

    const { displayRandomRoom, changeDisplayRandomRoom } = useLocalSettingsContext();


    return (
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} gap={2}>
            <Tooltip title="Hide or show the Join random room button">
                <FormControlLabel
                    sx={{
                        marginTop: 1,
                        marginLeft: 0
                    }}
                    control={
                        <Checkbox
                            checked={displayRandomRoom !== 'false'}
                            onChange={(e) => changeDisplayRandomRoom(e.target.checked ? 'true' : 'false', true)} />
                    }
                    label="Display random room prompt"
                />
            </Tooltip>
        </Stack>
    );
}