import { Alert, Box, Button, FormControl, Modal, Snackbar, TextField } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";
import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function UsernameSettings() {

    const { username, changeUsername } = useLocalSettingsContext();

    const [inputUsername, setInputUsername] = useState<string>(username);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const location = useLocation();
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pattern = /^\/room\/(.+)$/;

        const match = location.pathname.match(pattern);

        // require confirmation if currently in a room
        if (match) {
            setOpenConfirmation(true);
        } else {
            if (inputUsername !== username) {
                changeUsername(inputUsername);
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleConfirmation = () => {
        changeUsername(inputUsername);
        setOpenSnackbar(true);
        setOpenConfirmation(false);
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


            <Modal
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <p>Changing username while connected to a room will reload your connection.</p>
                    <p>Do you wish to continue?</p>
                    <Button onClick={handleConfirmation}>Confirm</Button>
                    <Button onClick={() => setOpenConfirmation(false)}>Cancel</Button>
                </Box>
            </Modal>

        </FormControl>
    );
}