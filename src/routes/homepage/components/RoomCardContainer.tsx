import { Card, Grid } from "@mui/material";

interface RoomCardContainer {
    children: React.ReactNode;
}

export default function RoomCardContainer({ children }: RoomCardContainer) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ minHeight: '240px', height: '100%', width: '100%', overflow: 'visible' }}>
                {children}
            </Card>
        </Grid>
    );
}