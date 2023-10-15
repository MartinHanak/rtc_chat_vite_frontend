import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Card, Modal, Tooltip } from "@mui/material";
import Settings from "./settings/Settings";


export function LocalSettingsModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title="Settings" placement={"bottom"}>
                <Button onClick={handleOpen}>
                    <SettingsIcon />
                </Button>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card
                    sx={{
                        maxWidth: '380px',
                        maxHeight: '580px',
                        overflowY: 'auto',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        gap: 2
                    }}>

                    <Settings closeModal={handleClose} />
                </Card>
            </Modal>
        </>
    );
}