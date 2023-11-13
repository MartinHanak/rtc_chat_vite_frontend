import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import MainGridItem from "./MainGridItem";
import MainGridSortableContext from "./MainGridSortableContext";
import { useEffect, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import EmptyMainGridItem from "./EmptyMainGridItem";

interface MainGrid {
    rows: number;
    columns: number;
    streams: Map<string, combinedUserState>;
}

export default function MainGrid({ rows, columns, streams }: MainGrid) {

    const gridItemWidth = Math.max(1, Math.floor(12 / columns));

    const [items, setItems] = useState<UniqueIdentifier[]>([]);
    const [itemStreamMap, setItemStreamMap] = useState<Map<UniqueIdentifier, combinedUserState>>(new Map());

    useEffect(() => {
        const newItems: UniqueIdentifier[] = [];
        const newItemStreamMap = new Map<UniqueIdentifier, combinedUserState>();

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                newItems.push(`mainGrid_${col}x${row}`);
            }
        }

        let index = 0;
        streams.forEach((streamInfo) => {
            const row = Math.floor(index / columns);
            const col = Math.floor(index % columns);
            newItemStreamMap.set(`mainGrid_${col}x${row}`, streamInfo);
            index += 1;
        });


        setItemStreamMap(newItemStreamMap);

        setItems(newItems);

    }, [streams, rows, columns]);

    const handleItemsChange = (newItems: UniqueIdentifier[]) => {
        setItems(newItems);
    };


    return (
        <Grid container spacing={2} sx={{ marginTop: 0, paddingTop: 8 }}>
            <MainGridSortableContext items={items} setItems={handleItemsChange}>
                {items.map((item) => {
                    const streamInfo = itemStreamMap.get(item);

                    if (!streamInfo || streamInfo.displayState !== 'main') {
                        return (<EmptyMainGridItem
                            dragId={item as string}
                            key={item}
                            width={gridItemWidth}
                        />);
                    }

                    return (
                        < MainGridItem
                            dragId={item as string}
                            key={item}
                            width={gridItemWidth}
                            streamInfo={streamInfo}
                        />
                    );
                })}
            </MainGridSortableContext>
        </Grid>
    );
}