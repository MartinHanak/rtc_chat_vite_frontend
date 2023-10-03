import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";
import { grey } from '@mui/material/colors';

interface StreamDisplayControl {
    active: boolean;
    user: combinedUserState;
    displaySwitch: (state: displayState) => void;
}

export default function StreamDisplayControl({ active, user, displaySwitch }: StreamDisplayControl) {

    const displayStates: displayState[] = ['main', 'side', 'unselected'];

    const handleDisplayStateChange = (
        _event: React.MouseEvent<HTMLElement>,
        newState: displayState,
    ) => {
        displaySwitch(newState);
    };

    return (
        <Box sx={{
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            border: '5px solid black',
            transform: active ? '' : 'scale(0.5)',
            pointerEvents: active ? 'auto' : 'none',
            backgroundColor: active ? '' : grey[400]
        }} >
            {user.username}

            <ToggleButtonGroup
                value={user.displayState}
                exclusive
                onChange={handleDisplayStateChange}
            >
                {displayStates.map((state) => {
                    return (
                        <ToggleButton key={`${user.socketId}_display_state_${state}`} value={state}>
                            {state}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>

        </Box>
    );
}