import { Alert, Box, Button, Container, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { BACKEND_URL } from "../../util/config";
import { RoomType } from "../../types/room";
import { useNavigate } from "react-router-dom";

import VideocamIcon from '@mui/icons-material/Videocam';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CreateIcon from '@mui/icons-material/Create';
import HeaderFiller from "../../components/HeaderFiller";

export default function NewRoomRoute() {

    const [name, setName] = useState<string>('');
    const [type, setType] = useState<RoomType>('video');
    const [description, setDescription] = useState<string>('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('error');

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const inputName = name;

        if (inputName === "") {
            setOpen(true);
            setMessage(`Name cannot be empty`);
            setSeverity('error');
            return;
        }


        fetch(`${BACKEND_URL}/api/room`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: encodeURIComponent(inputName),
                type,
                description
            })
        }).then((res) => {
            if (res.ok) {
                console.log(`Room ${name} created.`);
                //router.push(`/room/${encodeURIComponent(inputName)}`);
                setOpen(true);
                setMessage(`Room  ${name} created.`);
                setSeverity('success');
                navigate(`/room/${encodeURIComponent(inputName)}`);
            } else {
                setOpen(true);
                setMessage(`Room with the name ${name} already exists.`);
                setSeverity('error');
            }
        }).catch((err) => console.log(err));
    }

    function handleTypeChange(e: SelectChangeEvent<RoomType>) {
        if (["video", "audio", "text"].includes(e.target.value)) {
            setType(e.target.value as RoomType);
        }
    }

    return (
        <Container>
            <HeaderFiller />
            <Typography variant="h3">Create a new room</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                >
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>

                </Snackbar>


                <FormControl>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={handleTypeChange}
                        sx={{
                            '& .MuiSelect-select': {
                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start',
                                gap: 2
                            },
                            '& .MuiListItemIcon-root': {
                                minWidth: 0
                            }
                        }}
                    >
                        <MenuItem value={"video"} >
                            <ListItemIcon>
                                <VideocamIcon />
                            </ListItemIcon>
                            <ListItemText primary="Video" />
                        </MenuItem>
                        <MenuItem value={"audio"}>
                            <ListItemIcon>
                                <AudiotrackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Audio" />
                        </MenuItem>
                        <MenuItem value={"text"}>
                            <ListItemIcon>
                                <CreateIcon />
                            </ListItemIcon>
                            <ListItemText primary="Text" />
                        </MenuItem>
                    </Select>
                </FormControl>

                <TextField label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />

                <Button type="submit"> Confirm </Button>
            </Box>
        </Container>
    );
}