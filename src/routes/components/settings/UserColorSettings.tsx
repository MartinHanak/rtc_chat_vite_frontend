import { MuiColorInput } from "mui-color-input";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import assignUserColor from "../../../util/assignUserColor";
import { IconButton, Stack, Tooltip } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';

export default function UserColorSettings() {

    const { userColor, changeUserColor } = useLocalSettingsContext();


    return (
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

            <MuiColorInput value={userColor ? userColor : assignUserColor()} onChange={changeUserColor} label={"User color"} />

            <Tooltip title="Random color">
                <IconButton onClick={() => changeUserColor(assignUserColor())}
                    sx={{ backgroundColor: theme => theme.palette.action.hover }}
                >
                    <PaletteIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}