import { PaletteColor, ToggleButton, ToggleButtonGroup, ToggleButtonProps, styled } from "@mui/material";
import { RoomType } from "../../../types/room";

interface RoomTypeSelection {
    selected: RoomType[],
    setSelection: (event: React.MouseEvent<HTMLElement>, input: RoomType[]) => void;
}

interface RoomTypeToggleButtonProps extends ToggleButtonProps {
    roomType: RoomType;
}


const RoomTypeToggleButton = styled(ToggleButton, {
    shouldForwardProp: (prop) => prop !== 'roomType',
})<RoomTypeToggleButtonProps>(
    ({ roomType, theme }) => {

        let color: PaletteColor;
        switch (roomType) {
            case 'video':
                color = theme.palette['primary'];
                break;
            case 'audio':
                color = theme.palette['secondary'];
                break;
            default:
                color = theme.palette['tertiary'];
                break;
        }

        return {
            '&.MuiToggleButtonGroup-grouped': {
                height: '6rem',
                '&.Mui-selected': {
                    backgroundColor: color.main
                },
                '&:hover': {
                    backgroundColor: color.light
                },
                '&:not(.Mui-selected):hover': {
                    backgroundColor: theme.palette.grey[100]
                },
                '&:not(:last-of-type)': {
                    borderRadius: '10px 10px 0 0',
                },
                '&:not(:first-of-type)': {
                    borderRadius: '10px 10px 0 0',
                }
            }

        };
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
                    <RoomTypeToggleButton key={type} value={type} roomType={type as RoomType} aria-label={type} >
                        {displayText}
                    </RoomTypeToggleButton>
                );
            })}

        </ToggleButtonGroup>
    );
}