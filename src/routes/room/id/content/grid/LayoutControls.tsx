import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';

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
        <Box sx={{
            position: 'absolute',
            zIndex: 999,
            top: theme => theme.spacing(2),
            left: theme => theme.spacing(2),
            backgroundColor: theme => theme.palette.background.default
        }}>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={1} >
                <TableRowsRoundedIcon fontSize={"large"} sx={{ transform: 'rotate(90deg)' }} />
                <ToggleButtonGroup
                    value={columns}
                    exclusive
                    onChange={handleColumnsToggle}
                    aria-label="columns layout"
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

            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={1} >
                <TableRowsRoundedIcon fontSize={"large"} />
                <ToggleButtonGroup
                    value={rows}
                    exclusive
                    onChange={handleRowsToggle}
                    aria-label="columns layout"
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
    );
}