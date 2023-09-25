import useGridLayoutSettings from "./hooks/useGridLayoutSettings";
import MainGrid from "./MainGrid";
import useCombinedDisplayStreamState from "./hooks/useCombinedDisplayStreamState";
import { Box } from "@mui/material";
import LayoutControls from "./LayoutControls";
import SideGrid from "./SideGrid";
import GridDisplayControls from "./GridDisplayControls";
import useDisplayControls from "./hooks/useDisplayControls";
import TextChatOverlay from "./TextChatOverlay";


export default function GridView() {

    // main grid layout
    const { rows, columns, changeColumnsNumber, changeRowsNumber } = useGridLayoutSettings();

    // display controls
    const { show, height, toggle, setHeight } = useDisplayControls();

    const { streams } = useCombinedDisplayStreamState();

    return (
        <Box sx={{ position: 'relative', minHeight: '500px' }}>

            <MainGrid rows={rows} columns={columns} streams={streams} />

            <LayoutControls rows={rows} columns={columns} changeRows={changeRowsNumber} changeColumns={changeColumnsNumber} />

            <SideGrid streams={streams} offset={show ? height + 32 : 32} />

            <TextChatOverlay offset={show ? height + 32 : 32} />

            <GridDisplayControls streams={streams} setHeight={setHeight} toggle={toggle} show={show} />
        </Box>
    );
}