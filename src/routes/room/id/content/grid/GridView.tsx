import useGridLayoutSettings from "./hooks/useGridLayoutSettings";
import MainGrid from "./MainGrid";
import useCombinedDisplayStreamState from "./hooks/useCombinedDisplayStreamState";


export default function GridView() {

    // main grid layout
    const { rows, columns } = useGridLayoutSettings();

    const { streams } = useCombinedDisplayStreamState();

    return (
        <>
            <MainGrid rows={rows} columns={columns} streams={streams} />
        </>
    );
}