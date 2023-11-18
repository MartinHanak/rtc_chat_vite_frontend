import { Container } from "@mui/material";
import HeaderFiller from "../../components/HeaderFiller";
import Loader from "../../components/Loader";

export default function LoadingRoute() {

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
            <HeaderFiller />

            <Loader />

        </Container>
    );
}