import { Card, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";
import { grey } from '@mui/material/colors';

import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import HideSourceRoundedIcon from '@mui/icons-material/HideSourceRounded';
import React from "react";


interface StreamDisplayControl {
    active: boolean;
    user: combinedUserState;
    displaySwitch: (state: displayState) => void;
}

export default function StreamDisplayControl({ active, user, displaySwitch }: StreamDisplayControl) {

    const displayStates: { state: displayState, icon: React.ReactNode, tooltip: string; }[] = [

        {
            state: 'side',
            icon: <ViewSidebarRoundedIcon sx={{ transform: 'rotate(180deg)' }} />,
            tooltip: 'Side'
        },
        {
            state: 'main',
            icon: <ViewModuleRoundedIcon />,
            tooltip: 'Main'
        },
        {
            state: 'unselected',
            icon: <HideSourceRoundedIcon />,
            tooltip: 'Hidden'
        }
    ];

    const handleDisplayStateChange = (
        _event: React.MouseEvent<HTMLElement>,
        newState: displayState,
    ) => {
        displaySwitch(newState);
    };

    return (
        <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            // border: '5px solid black',
            pointerEvents: active ? 'auto' : 'none',
            backgroundColor: active ? '' : grey[400]
        }} >
            {user.username}

            <ToggleButtonGroup
                value={user.displayState}
                exclusive
                onChange={handleDisplayStateChange}
            >
                {displayStates.map(({ state, icon, tooltip }) => {
                    return (

                        <ToggleButton value={state} key={`${user.socketId}_display_state_${state}`}>
                            <Tooltip title={tooltip} >
                                <>
                                    {icon}
                                </>
                            </Tooltip>
                        </ToggleButton>

                    );
                })}
            </ToggleButtonGroup>

        </Card>
    );
}