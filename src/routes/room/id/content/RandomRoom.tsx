import { Box, Checkbox, FormControlLabel, IconButton, Stack, Typography } from "@mui/material";
import { useAvailableRoomsContext } from "../../../components/AvailableRoomsContext";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";
import { nanoid } from "nanoid";
import { RoomType } from "../../../../types/room";
import { BACKEND_URL } from "../../../../util/config";


export default function RandomRoom() {
    const { rooms } = useAvailableRoomsContext();
    const { changeDisplayRandomRoom, mode } = useLocalSettingsContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [checked, setChecked] = useState<boolean>(false);
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');
    const [roomName, setRoomName] = useState<string>('');

    useEffect(() => {
        if (status === 'loading' && rooms.findIndex(room => room.name === roomName) !== -1) {
            navigate(`/room/${encodeURIComponent(roomName)}`);
            setStatus('idle');
        }
    }, [roomName, rooms, status, navigate]);

    const joinRandomRoom = () => {
        if (status === 'loading') {
            return;
        }

        console.log('joining a random room');

        if (rooms.length === 0) {
            createRandomRoom().catch((e) => console.error(e));
            return;
        }

        const path = location.pathname.split('/');
        const currentRoom = path[path.length - 1];
        console.log(`current room: ${currentRoom}`);

        const randomIndex = Math.floor(Math.random() * rooms.length);
        const randomRoom = rooms[randomIndex];
        console.log(`joining room: ${encodeURIComponent(randomRoom.name)}`);

        if (randomRoom.name !== currentRoom) {
            navigate(`/room/${encodeURIComponent(randomRoom.name)}`);
        } else {
            createRandomRoom().catch((e) => console.error(e));
            return;
        }

    };

    const handleClose = () => {
        changeDisplayRandomRoom('false', checked);
    };

    const createRandomRoom = async () => {
        setStatus('loading');
        navigate(`/loading`);

        // TODO: fixes issues of connecting and disconnecting immediately
        // if not redirected

        // other solution:
        //  redirect to
        //         navigate(`/room/${encodeURIComponent(name)}`);
        // problem: displays "room does not exist" until BE creates the room


        const name: string = nanoid();
        setRoomName(name);
        const typeIndex = Math.floor(Math.random() * 3);
        let type: RoomType = 'video';
        switch (typeIndex) {
            case 0:
                type = 'video';
                break;
            case 1:
                type = 'audio';
                break;
            case 2:
            default:
                type = 'text';
                break;
        }

        try {
            await fetch(`${BACKEND_URL}/api/room`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    type,
                    privateRoom: false
                })
            });
        } catch (err) {
            console.log(err);
            setStatus('idle');
            return;
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '48px', right: 0,
                backgroundColor: theme => mode === 'light' ? theme.palette.error.light : theme.palette.error.main,
                cursor: 'pointer',
                userSelect: 'none',
                paddingY: 1,
                paddingLeft: 2,
                paddingRight: 6,
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 8px 50%)'
            }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <IconButton onClick={handleClose}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                <Stack direction={'column'} justifyContent={'space-between'} alignItems={'start'} >
                    <Typography variant="h5" fontWeight={'bold'} onClick={joinRandomRoom}>
                        Join a random room
                    </Typography>
                    <FormControlLabel
                        sx={{
                            '& .MuiCheckbox-root': {
                                paddingY: 0
                            },
                            '& .MuiFormControlLabel-label': {
                                fontSize: '13px',
                            }
                        }}
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)} />
                        }
                        label="Do not display again"
                    />
                </Stack>
            </Stack>

        </Box>
    );
}