import useGridLayoutSettings from "./hooks/useGridLayoutSettings";
import MainGrid from "./MainGrid";
import useCombinedDisplayStreamState from "./hooks/useCombinedDisplayStreamState";
import { Box } from "@mui/material";
import LayoutControls from "./LayoutControls";
import SideGrid from "./SideGrid";
import GridDisplayControls from "./GridDisplayControls";
import useDisplayControls from "./hooks/useDisplayControls";
import ChatOverlay from "./ChatOverlay";
import InitialAlert from "./InitialAlert";
import Users from "../grid_overlay/Users";


export default function GridView() {

    // main grid layout
    const { rows, columns, changeColumnsNumber, changeRowsNumber } = useGridLayoutSettings();

    // display controls
    const { show, height, toggle, setHeight } = useDisplayControls();

    const { streams, changeUserDisplayState } = useCombinedDisplayStreamState();

    return (
        <>
            <InitialAlert />
            <Box sx={{ position: 'relative', minHeight: '500px' }}>

                <MainGrid rows={rows} columns={columns} streams={streams} />

                <LayoutControls rows={rows} columns={columns} changeRows={changeRowsNumber} changeColumns={changeColumnsNumber} />

                <SideGrid streams={streams} offset={show ? height : 0} />

                <ChatOverlay offset={show ? height : 0} overlay={true} />

                <Users offset={show ? height : 0} />

                <GridDisplayControls streams={streams} setHeight={setHeight} height={height} toggle={toggle} show={show} changeUserDisplayState={changeUserDisplayState} />
            </Box>
        </>
    );
}