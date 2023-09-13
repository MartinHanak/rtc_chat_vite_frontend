import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { RoomType } from "../../../types/room";

interface RoomTypeSelection {
    selected: RoomType[],
    setSelection: (event: React.MouseEvent<HTMLElement>, input: RoomType[]) => void;
}

export default function RoomTypeSelection({ selected, setSelection }: RoomTypeSelection) {

    const typeToDisplayedText: Record<RoomType, string> = {
        'video': 'Video',
        'audio': 'Audio',
        'text': 'Text'
    };

    return (
        <ToggleButtonGroup value={selected} onChange={setSelection} aria-label="room type selection">

            {Object.entries(typeToDisplayedText).map(([type, displayText]) => {
                return (
                    <ToggleButton key={type} value={type} aria-label={type}>
                        {displayText}
                    </ToggleButton>
                );
            })}

        </ToggleButtonGroup>
    );
}