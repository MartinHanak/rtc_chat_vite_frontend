import useGridLayoutSettings from "./hooks/useGridLayoutSettings";
import MainGrid from "./MainGrid";
import useCombinedDisplayStreamState from "./hooks/useCombinedDisplayStreamState";
import { Box } from "@mui/material";
import LayoutControls from "./LayoutControls";
import SideGrid from "./SideGrid";
import GridDisplayControls from "./GridDisplayControls";


export default function GridView() {

    // main grid layout
    const { rows, columns, changeColumnsNumber, changeRowsNumber } = useGridLayoutSettings();

    const { streams } = useCombinedDisplayStreamState();

    return (
        <Box sx={{ position: 'relative', minHeight: '500px' }}>

            <MainGrid rows={rows} columns={columns} streams={streams} />

            <LayoutControls rows={rows} columns={columns} changeRows={changeRowsNumber} changeColumns={changeColumnsNumber} />

            <SideGrid streams={streams} />

            <GridDisplayControls streams={streams} />
        </Box>
    );
}