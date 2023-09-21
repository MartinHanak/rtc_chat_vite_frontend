import { Card } from "@mui/material";

interface RoomCardContainer {
    children: React.ReactNode;
}

export default function RoomCardContainer({ children }: RoomCardContainer) {
    return (
        <Card sx={{ minWidth: 150, minHeight: 200, width: '100%', height: '100%', overflow: 'visible' }}>
            {children}
        </Card>
    );
}