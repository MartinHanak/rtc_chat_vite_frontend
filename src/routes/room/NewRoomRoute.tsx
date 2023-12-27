import { Alert, Button, Card, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Snackbar, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { BACKEND_URL } from "../../util/config";
import { RoomType } from "../../types/room";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import VideocamIcon from '@mui/icons-material/Videocam';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CreateIcon from '@mui/icons-material/Create';
import HeaderFiller from "../../components/HeaderFiller";
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { getEmojiFlag, getCountryDataList, languages } from "countries-list";
import RoomTags from "./RoomTags";

export default function NewRoomRoute() {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<RoomType>('video');
    const [language, setLanguage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [privateRoom, setPrivateRoom] = useState<boolean>(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('error');

    const navigate = useNavigate();

    const countries = getCountryDataList().sort((a, b) => a.name.localeCompare(b.name));

    const handleClose = () => {
        setOpen(false);
    };

    const handleGeneratingRandomName = () => {
        setName(nanoid());
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
                description,
                country: language,
                tags,
                privateRoom,
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
                setMessage(`Room with the given name ${name} already exists.`);
                setSeverity('error');
            }
        }).catch((err) => console.log(err));
    }

    function handleTypeChange(e: SelectChangeEvent<RoomType>) {
        if (["video", "audio", "text"].includes(e.target.value)) {
            setType(e.target.value as RoomType);
        }
    }

    function handleLanguageChange(e: SelectChangeEvent<string>) {
        setLanguage(e.target.value);
    }

    function handleTagsChange(value: string[]) {
        setTags(value);
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
            <HeaderFiller />
            <Typography variant="h3" fontWeight={700} sx={{
                paddingY: 2,
                paddingX: 4,
            }}>
                Create a new room
            </Typography>

            <Card
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: '620px',
                    marginBottom: '360px',
                    boxShadow: theme => theme.shadows[5],
                    display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start',
                    gap: 4,
                    backgroundColor: theme => theme.palette.background.secondaryDefault
                }}
            >
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                >
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>

                <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} width={1} gap={4}>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ width: 1, flexGrow: 1 }}
                    />

                    <Tooltip title="Generate a random name">
                        <IconButton onClick={handleGeneratingRandomName} sx={{
                            flexShrink: 0, marginRight: 1,
                            '&.MuiIconButton-root': {
                                backgroundColor: theme => theme.palette.action.hover
                            }
                        }}>
                            <LightbulbIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <FormControl sx={{ width: 1 }}>
                    <InputLabel id="type-select-label" >Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={handleTypeChange}
                        sx={{
                            width: 1,
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

                <FormControl sx={{ width: 1 }}>
                    <InputLabel id="language-select-label" >Language</InputLabel>
                    <Select
                        defaultValue=""
                        labelId="language-select-label"
                        id="language-select"
                        value={language}
                        label="Language"
                        onChange={handleLanguageChange}
                        sx={{
                            width: 1,
                            '& .MuiSelect-select': {
                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start',
                                gap: 2
                            },
                            '& .MuiListItemIcon-root': {
                                minWidth: 0
                            }
                        }}
                    >
                        {countries.map((country) => {
                            const langCode = country.languages[0];
                            if (!(langCode in languages)) {
                                return null;
                            }
                            const lang = languages[langCode];
                            const langName = lang.name;
                            return (
                                <MenuItem value={country.name} key={country.name}>
                                    <ListItemText sx={{ marginLeft: 4 }} primary={`${country.name} (${langName})`} />
                                    <ListItemIcon sx={{ position: 'absolute', fontSize: '1.5em' }}>
                                        <span>{getEmojiFlag(country.iso2)}</span>
                                    </ListItemIcon>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>



                <TextField label="Description" multiline minRows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        width: 1
                    }} />

                <RoomTags tags={tags} handleTagsChange={handleTagsChange} />

                <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                    <FormControlLabel
                        control={<Checkbox checked={privateRoom} onChange={(e) => setPrivateRoom(e.target.checked)} />}
                        label="Make the room private?"
                        labelPlacement="end"
                        sx={{
                            marginRight: 1,
                        }}
                    />
                    <Tooltip title="Private rooms are hidden on the home page but anyone with the link can still visit them.">
                        <InfoIcon />
                    </Tooltip>
                </Stack>

                <Button variant="contained" type="submit" sx={{ alignSelf: 'end', marginRight: { xs: 2, sm: 4 } }}> Confirm </Button>
            </Card>
        </Container>
    );
}