import { Card } from "@mui/material";

interface RoomCardContainer {
    children: React.ReactNode;
}

export default function RoomCardContainer({ children }: RoomCardContainer) {
    return (
        <Card>
            {children}
        </Card>
    );
}