import { Stack, TextField } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import { useEffect, useState } from "react";



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
        <Stack sx={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>

            <TextField label="Username" variant="outlined"
                autoComplete="false"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
        </Stack>
    );
}