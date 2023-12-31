import { Autocomplete, Chip, TextField } from "@mui/material";


interface RoomTags {
    tags: string[];
    handleTagsChange: (tags: string[]) => void;
}

export default function RoomTags({ tags, handleTagsChange }: RoomTags) {
    return <Autocomplete
        value={tags}
        clearIcon={false}
        multiple
        onChange={(_event, newValue: string[]) => {
            handleTagsChange(newValue);
        }}
        options={[]}
        freeSolo
        renderTags={(value, props) =>
            value.map((option, index) => (
                <Chip label={option} {...props({ index })} />
            ))
        }
        renderInput={(params) => {
            return (
                <TextField label="" placeholder="Tags"   {...params}
                    inputProps={{ ...params.inputProps, maxLength: 20 }}
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'transparent'
                        },
                        '& .MuiFormLabel-root': {
                            backgroundColor: 'transparent',
                            borderRadius: 5,
                            paddingX: 1,
                            transform: 'translate(9px, -9px) scale(0.75)'
                        }
                    }}

                    InputLabelProps={{ shrink: false }}
                />
            );
        }}

        sx={{
            width: 1
        }}
    />;
}