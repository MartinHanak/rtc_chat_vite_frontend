import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import { useEffect, useState } from "react";
import { generateUsername } from 'friendly-username-generator';
import DrawIcon from '@mui/icons-material/Draw';


export default function UsernameSettings() {

    const { username, changeUsername } = useLocalSettingsContext();

    const [inputValue, setInputValue] = useState<string>(username);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newUsername = inputValue.trim();
            if (newUsername !== '') {
                changeUsername(newUsername);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputValue, changeUsername]);

    return (
        <Stack sx={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>

            <TextField label="Username" variant="outlined"
                autoComplete="false"

                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{
                    width: '100%',
                    flexShrink: 1
                }}
            />

            <Tooltip title="Random username">
                <IconButton onClick={() => setInputValue(generateUsername())}
                    sx={{ backgroundColor: theme => theme.palette.action.hover }}
                >
                    <DrawIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}