import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import MainGridItem from "./MainGridItem";
import { useState } from "react";

interface MainGrid {
    rows: number;
    columns: number;
    streams: Map<string, combinedUserState>;
}

export default function MainGrid({ rows, columns, streams }: MainGrid) {

    const gridItemWidth = Math.max(1, Math.floor(12 / columns));

    const [streamIdentifiers, setStreamIdentifiers] = useState<UniqueIdentifier[]>(() =>
        Array.from(streams.values())
            .map((streamInfo) => `mainGrid_${columns}x${rows}_${streamInfo.socketId}`)
    );

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setStreamIdentifiers((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Grid container spacing={2} >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={streamIdentifiers}
                    strategy={rectSortingStrategy}
                >
                    {Array.from(streams.values()).map((streamInfo) => {

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
                </SortableContext>
            </DndContext>
        </Grid>
    );
}