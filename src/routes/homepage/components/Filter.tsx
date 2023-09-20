import { TextField } from "@mui/material";

interface Filter {
    items: string[];
    handleItemsChange: (items: string[]) => void;
}

export default function Filter({ items, handleItemsChange }: Filter) {

    return (
        <TextField />
    );
}