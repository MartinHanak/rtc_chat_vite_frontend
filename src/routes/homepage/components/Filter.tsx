import { Autocomplete, Chip, TextField } from "@mui/material";

interface Filter {
    items: string[];
    handleItemsChange: (items: string[]) => void;
}

export default function Filter({ items, handleItemsChange }: Filter) {

    return (
        <Autocomplete
            value={items}
            onChange={(_event, newValue: string[]) => {
                handleItemsChange(newValue);
            }}
            clearIcon={false}
            options={[]}
            freeSolo
            multiple
            renderTags={(value, props) =>
                value.map((option, index) => (
                    <Chip label={option} {...props({ index })} />
                ))
            }
            renderInput={(params) => {
                return (
                    <TextField label="Search" {...params} />
                );
            }}
            sx={{
                maxWidth: '500px'
            }}
        />
    );
}