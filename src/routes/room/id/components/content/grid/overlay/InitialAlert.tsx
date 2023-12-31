import { Alert, Typography } from "@mui/material";
import { useState } from "react";

export default function InitialAlert() {
    const [show, setShow] = useState(true);

    return (
        <Alert severity="info"
            onClose={() => setShow(false)}
            sx={{
                pointerEvents: 'auto',
                marginX: 'auto',
                paddingX: 4,
                width: 'max-content',
                display: show ? 'flex' : 'none'
            }}>
            <Typography>  Invite your friends by sending them this link:</Typography>
            <Typography><strong>{window.location.href}</strong></Typography>
        </Alert>
    );
}