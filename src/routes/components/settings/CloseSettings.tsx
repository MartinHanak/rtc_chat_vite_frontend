import { Button } from "@mui/material";

interface CloseSettings {
    closeModal: () => void;
}

export default function CloseSettings({ closeModal }: CloseSettings) {
    return (
        <Button onClick={closeModal}>Close</Button>
    );
}