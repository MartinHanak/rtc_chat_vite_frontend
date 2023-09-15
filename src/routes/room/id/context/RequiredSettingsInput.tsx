import { Box, Button, TextField } from "@mui/material";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";
import { FormEvent, useState } from "react";

export function RequiredSettingsInput() {

    const { username, changeUsername } = useLocalSettingsContext();

    const [inputUsername, setInputUsername] = useState<string>(username);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        changeUsername(inputUsername);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>

            <TextField id="username-input" label="Username" variant="outlined"
                value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />

            <Button variant="contained" type="submit">Confirm</Button>

        </Box>
    );
}