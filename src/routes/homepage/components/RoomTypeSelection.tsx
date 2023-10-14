import { PaletteColor, ToggleButton, ToggleButtonGroup, ToggleButtonProps, styled } from "@mui/material";
import { RoomType } from "../../../types/room";
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';

interface RoomTypeSelection {
    selected: RoomType[],
    setSelection: (event: React.MouseEvent<HTMLElement>, input: RoomType[]) => void;
}

const typeToIcon: Record<RoomType, React.ReactNode> = {
    'video': <VideoChatIcon sx={{ fontSize: 40, color: "primary.dark" }} />,
    'audio': <VoiceChatIcon sx={{ fontSize: 40, color: "secondary.dark" }} />,
    'text': <ChatIcon sx={{ fontSize: 40, color: "tertiary.dark" }} />
};


interface StyledRoomTypeToggleProps extends ToggleButtonProps {
    roomType: RoomType;
}

export const StyledRoomTypeToggle = styled(ToggleButton, {
    shouldForwardProp: (prop) => prop !== 'roomType',
})<StyledRoomTypeToggleProps>(
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '56px',
                '&.Mui-selected': {
                    backgroundColor: color.main,
                    color: '#000000',
                },
                '&:not(.Mui-selected)': {
                    color: theme.palette.text.disabled
                },
                '&:hover': {
                    backgroundColor: color.light
                },
                '&:not(.Mui-selected):hover': {
                    backgroundColor: theme.palette.background.light
                },
                '&:not(.Mui-selected) .MuiSvgIcon-root': {
                    color: theme.palette.action.disabled
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

            {Object.entries(typeToDisplayedText).map(([type, _displayText]) => {
                return (

                    <StyledRoomTypeToggle roomType={type as RoomType} key={type} value={type} aria-label={type} sx={{ position: 'relative' }} >
                        {_displayText}
                        {typeToIcon[type as RoomType]}
                    </StyledRoomTypeToggle>
                );
            })}

        </ToggleButtonGroup>
    );
}