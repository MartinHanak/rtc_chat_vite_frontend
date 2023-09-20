import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Modal } from "@mui/material";
import Settings from "./settings/Settings";


export function LocalSettingsModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>
                <SettingsIcon />
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={{
                    position: 'absolute', top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>

                    <Settings closeModal={handleClose} />
                </Box>
            </Modal>
        </>
    );
}