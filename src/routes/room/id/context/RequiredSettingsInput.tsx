import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";
import { FormEvent, useState } from "react";
import HeaderFiller from "../../../../components/HeaderFiller";

export function RequiredSettingsInput() {

    const { username, changeUsername } = useLocalSettingsContext();

    const [inputUsername, setInputUsername] = useState<string>(username);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        changeUsername(inputUsername);
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
            <HeaderFiller />
            <Typography variant="h3" fontWeight={700} sx={{
                paddingY: 2,
                paddingX: 4,
            }}>
                Select a username
            </Typography>

            <Card
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: '480px',
                    marginBottom: '360px',
                    boxShadow: theme => theme.shadows[5],
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                    gap: 4,
                    backgroundColor: theme => theme.palette.background.secondaryDefault
                }}
            >
                <TextField sx={{ width: '100%', marginX: 4, marginY: 2 }} id="username-input" label="Username" variant="outlined"
                    value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />

                <Button sx={{ alignSelf: 'end', marginRight: 4 }} variant="contained" type="submit">Confirm</Button>
            </Card>
        </Container>
    );
}