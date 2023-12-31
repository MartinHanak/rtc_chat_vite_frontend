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
                    <TextField label="" placeholder="Search" {...params}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: theme => theme.palette.background.light
                            },
                            '& .MuiFormLabel-root': {
                                backgroundColor: theme => theme.palette.background.light,
                                borderRadius: 5,
                                paddingX: 1,
                                transform: 'translate(9px, -9px) scale(0.75)'
                                // transform: 'translateX(-8px)'
                            }
                        }}
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
                width: '100%',
            }}
        />
    );
}