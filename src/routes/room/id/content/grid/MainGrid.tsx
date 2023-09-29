import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import MainGridItem from "./MainGridItem";
import MainGridSortableContext from "./MainGridSortableContext";
import { useEffect, useRef, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

interface MainGrid {
    rows: number;
    columns: number;
    streams: Map<string, combinedUserState>;
}

export default function MainGrid({ rows, columns, streams }: MainGrid) {

    const gridItemWidth = Math.max(1, Math.floor(12 / columns));

    const previousItemsOrderRef = useRef<UniqueIdentifier[]>([]);
    const [items, setItems] = useState<UniqueIdentifier[]>([]);
    const [itemStreamMap, setItemStreamMap] = useState<Map<UniqueIdentifier, combinedUserState>>(new Map());

    useEffect(() => {
        const newItems: UniqueIdentifier[] = [];
        const newItemStreamMap = new Map<UniqueIdentifier, combinedUserState>();

        streams.forEach((streamInfo) => {
            const newItem = `mainGrid_${columns}x${rows}_${streamInfo.socketId}`;
            newItems.push(newItem);
            newItemStreamMap.set(newItem, streamInfo);
        });


        setItemStreamMap(newItemStreamMap);

        // remember previous order of items when streams change
        const updatedItems: UniqueIdentifier[] = [];

        previousItemsOrderRef.current.forEach((item) => {
            if (newItemStreamMap.has(item)) {
                updatedItems.push(item);
            }
        });
        // add new ones
        for (const addedItem of newItemStreamMap.keys()) {
            if (!updatedItems.includes(addedItem)) {
                updatedItems.push(addedItem);
            }
        }

        // update previous order
        previousItemsOrderRef.current = updatedItems;
        setItems(updatedItems);

    }, [streams, rows, columns]);

    const handleItemsChange = (newItems: UniqueIdentifier[]) => {
        setItems(newItems);
    };


    return (
        <Grid container spacing={2} >
            <MainGridSortableContext items={items} setItems={handleItemsChange}>
                {items.map((item) => {
                    const streamInfo = itemStreamMap.get(item);

                    if (!streamInfo) {
                        return;
                    }

                    if (streamInfo.displayState !== 'main') {
                        return null;
                    }
                    // key forces rerender when columns or rows change
                    return (
                        < MainGridItem
                            dragId={`mainGrid_${columns}x${rows}_${streamInfo.socketId}`}
                            key={`mainGrid_${columns}x${rows}_${streamInfo.socketId}`}
                            width={gridItemWidth}
                            streamInfo={streamInfo}
                        />
                    );
                })}
            </MainGridSortableContext>
        </Grid>
    );
}