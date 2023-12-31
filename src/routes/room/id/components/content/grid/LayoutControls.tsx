import { Box, Button, ClickAwayListener, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useState } from "react";

const columnOptions = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
];

const rowsOptions = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
];

interface LayoutControls {
    rows: number;
    columns: number;
    changeRows: (input: number) => void,
    changeColumns: (input: number) => void;
}

export default function LayoutControls({ rows, columns, changeRows, changeColumns }: LayoutControls) {

    const [show, setShow] = useState(false);


    const handleColumnsToggle = (_e: React.MouseEvent<HTMLElement>, elementValue: string | null) => {

        const value = Number(elementValue);
        if (!isNaN(value) && value > 0) {
            changeColumns(value);
        }
    };

    const handleRowsToggle = (_e: React.MouseEvent<HTMLElement>, elementValue: string | null) => {

        const value = Number(elementValue);
        if (!isNaN(value) && value > 0) {
            changeRows(value);
        }
    };

    return (
        <ClickAwayListener onClickAway={() => setShow(false)}>
            <Box sx={{
                position: 'absolute',
                zIndex: 999,
                top: theme => theme.spacing(2),
                left: theme => theme.spacing(2),
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start'
            }}>
                <Button variant='contained'
                    onClick={() => setShow(prev => !prev)}
                    sx={{
                        minWidth: 0,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: 'max-content',
                        padding: 1,
                        borderRadius: 2,
                        backgroundColor: theme => theme.palette.background.default,
                        '&:hover': {
                            backgroundColor: theme => theme.palette.background.default,

                        }
                    }}>
                    <Tooltip title="Grid Layout" placement={"right"}>
                        <GridViewRoundedIcon fontSize={"large"} sx={{ color: theme => theme.palette.text.primary }} />
                    </Tooltip>
                </Button>


                <Box  >
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={1}
                        sx={{
                            opacity: show ? 1 : 0,
                            pointerEvents: show ? 'auto' : 'none',
                            transition: theme => theme.transitions.create(['opacity'], {
                                duration: 500,
                                delay: 0
                            }),
                            marginBottom: 1
                        }}
                    >
                        <Box sx={{
                            minWidth: 0,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            width: 'max-content',
                            padding: 1,
                            borderRadius: 2,
                            backgroundColor: theme => theme.palette.background.default
                        }}>
                            <Tooltip title="Columns" placement={"right"}>
                                <TableRowsRoundedIcon fontSize={"large"} sx={{ transform: 'rotate(90deg)' }} />
                            </Tooltip>
                        </Box>
                        <ToggleButtonGroup
                            value={columns}
                            exclusive
                            onChange={handleColumnsToggle}
                            aria-label="columns layout"
                            sx={{ backgroundColor: theme => theme.palette.background.default }}
                        >
                            {columnOptions.map((option) => {
                                return (
                                    <ToggleButton
                                        key={`column_${option.value}`}
                                        value={option.value}
                                        aria-label={`${option.value} columns`}>
                                        {option.value}
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </Stack>

                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={1}
                        sx={{
                            opacity: show ? 1 : 0,
                            pointerEvents: show ? 'auto' : 'none',
                            transition: theme => theme.transitions.create(['opacity'], {
                                duration: 500,
                                delay: show ? 300 : 0
                            }),
                        }}
                    >
                        <Box sx={{
                            minWidth: 0,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            width: 'max-content',
                            padding: 1,
                            borderRadius: 2,
                            backgroundColor: theme => theme.palette.background.default
                        }}>
                            <Tooltip title="Rows" placement={"right"}>
                                <TableRowsRoundedIcon fontSize={"large"} />
                            </Tooltip>
                        </Box>
                        <ToggleButtonGroup
                            value={rows}
                            exclusive
                            onChange={handleRowsToggle}
                            aria-label="columns layout"
                            sx={{ backgroundColor: theme => theme.palette.background.default }}
                        >
                            {rowsOptions.map((option) => {
                                return (
                                    <ToggleButton
                                        key={`column_${option.value}`}
                                        value={option.value}
                                        aria-label={`${option.value} columns`}>
                                        {option.value}
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </Stack>
                </Box>
            </Box>
        </ClickAwayListener>
    );
}