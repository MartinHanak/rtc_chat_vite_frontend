import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";

interface StreamDisplayControl {
    user: combinedUserState;
    displaySwitch: (state: displayState) => void;
}

export default function StreamDisplayControl({ user, displaySwitch }: StreamDisplayControl) {

    const displayStates: displayState[] = ['main', 'side', 'unselected'];

    const handleDisplayStateChange = (
        _event: React.MouseEvent<HTMLElement>,
        newState: displayState,
    ) => {
        displaySwitch(newState);
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
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