import { Autocomplete, Chip, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
                    <TextField label="Search" {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <>
                                <InputAdornment position="start"><SearchIcon /></InputAdornment>
                                {params.InputProps.startAdornment}
                            </>
                        }}
                    />
                );
            }}
            sx={{
                maxWidth: '500px'
            }}
        />
    );
}