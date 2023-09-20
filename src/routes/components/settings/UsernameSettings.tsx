import { Alert, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import { FormEvent, useState } from "react";

export default function UsernameSettings() {

    const { username, changeUsername } = useLocalSettingsContext();

    const [inputUsername, setInputUsername] = useState<string>(username);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitting');
        if (inputUsername !== username) {
            changeUsername(inputUsername);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit} sx={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>

            <TextField label="Username" variant="outlined"
                autoComplete="false"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)} />

            <Button type="submit" >Confirm</Button>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ width: '90%' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Username changed!
                </Alert>
            </Snackbar>

        </FormControl>
    );
}