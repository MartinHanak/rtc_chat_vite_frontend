import { MuiColorInput } from "mui-color-input";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import assignUserColor from "../../../util/assignUserColor";
import { IconButton, Stack, Tooltip } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import { useEffect, useState } from "react";

export default function UserColorSettings() {

    const { userColor, changeUserColor } = useLocalSettingsContext();
    const [inputValue, setInputValue] = useState(userColor ? userColor : assignUserColor());

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (inputValue !== '') {
                changeUserColor(inputValue);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [inputValue, changeUserColor]);


    return (
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

            <MuiColorInput value={inputValue} onChange={(newValue) => setInputValue(newValue)} label={"User color"} />

            <Tooltip title="Random color">
                <IconButton onClick={() => setInputValue(assignUserColor())}
                    sx={{ backgroundColor: theme => theme.palette.action.hover }}
                >
                    <PaletteIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}