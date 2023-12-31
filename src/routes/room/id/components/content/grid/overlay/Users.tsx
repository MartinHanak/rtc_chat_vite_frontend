import { Badge, Box, Card, IconButton, Stack } from "@mui/material";
import { useSocketContext } from "../../../context/SocketContext";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState } from "react";

interface Users {
    offset: number;
}


export default function Users({ offset }: Users) {
    const { users } = useSocketContext();

    const [displayUsers, setDisplayUsers] = useState(false);

    return (
        <Box sx={{
            position: "fixed",
            left: 0,
            bottom: offset,
            zIndex: 10000,
            marginBottom: 2,
            marginLeft: 2
        }}>

            <Stack
                sx={{
                    marginBottom: 2
                }}
                direction={"column"} justifyContent={'space-between'} alignItems={'start'} gap={2}>
                {users.map((user, index) => {
                    return (
                        <Card key={user.socketId} sx={{
                            paddingY: 1,
                            paddingX: 2,
                            opacity: displayUsers ? 1 : 0,
                            pointerEvents: displayUsers ? 'auto' : 'none',
                            transition: theme => theme.transitions.create(['opacity'], {
                                duration: 1000,
                                delay: displayUsers ? (users.length - index - 1) * 300 : 0
                            }),
                        }}>
                            <Box sx={{ color: user.color, fontWeight: 700 }}>{user.username}</Box>
                        </Card>
                    );
                })}
            </Stack>




            <IconButton onClick={() => setDisplayUsers((prev) => !prev)}>
                <Badge badgeContent={users.length} color="primary">
                    <AccountCircleRoundedIcon fontSize="large" sx={{ cursor: 'pointer' }} />
                </Badge>
            </IconButton>


        </Box>
    );
}