import { ToggleButton, ToggleButtonGroup, styled } from "@mui/material";
import { RoomType } from "../../../types/room";
import { deepOrange } from "@mui/material/colors";

interface RoomTypeSelection {
    selected: RoomType[],
    setSelection: (event: React.MouseEvent<HTMLElement>, input: RoomType[]) => void;
}

const RoomTypeToggleButton = styled(ToggleButton)({
    '&.MuiToggleButtonGroup-grouped': {
        backgroundColor: deepOrange[800],
        borderRadius: '50px',
        '&:Mui-disabled': {
            backgroundColor: deepOrange[100]
        },
        '&.Mui-selected': {
            backgroundColor: deepOrange[800]
        },
        '&:hover': {
            backgroundColor: deepOrange[800]
        },
        '&:not(:last-of-type)': {
            borderRadius: '50px',
        },
        '&:not(:first-of-type)': {
            borderRadius: '50px',
        }
    }

});

export default function RoomTypeSelection({ selected, setSelection }: RoomTypeSelection) {

    const typeToDisplayedText: Record<RoomType, string> = {
        'video': 'Video',
        'audio': 'Audio',
        'text': 'Text'
    };

    return (
        <ToggleButtonGroup value={selected} onChange={setSelection} fullWidth aria-label="room type selection" sx={{ borderRadius: 0 }}>

            {Object.entries(typeToDisplayedText).map(([type, displayText]) => {
                return (
                    <RoomTypeToggleButton key={type} value={type} aria-label={type} >
                        {displayText}
                    </RoomTypeToggleButton>
                );
            })}

        </ToggleButtonGroup>
    );
}