import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CloseSettings {
    closeModal: () => void;
}

export default function CloseSettings({ closeModal }: CloseSettings) {
    return (
        <IconButton onClick={closeModal} sx={{ position: 'absolute', top: 0, right: 0, margin: 2 }}>
            <CloseIcon fontSize="large" />
        </IconButton>
    );
}