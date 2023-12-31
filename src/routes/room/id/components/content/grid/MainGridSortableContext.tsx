import { DndContext, DragEndEvent, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import React, { useState } from "react";

interface MainGridSortableContext {
    children: React.ReactNode;
    items: UniqueIdentifier[];
    setItems: (newItems: UniqueIdentifier[]) => void,
}

export default function MainGridSortableContext({ children, items, setItems }: MainGridSortableContext) {

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            // Disable smooth scrolling in Cypress automated tests
            scrollBehavior: 'Cypress' in window ? 'auto' : undefined
        })
    );

    const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
    const activeIndex = activeId ? getIndex(activeId) : -1;

    const handleDragStart = ({ active }: DragStartEvent) => {
        if (!active) {
            return;
        }
        setActiveId(active.id);
    };

    const handleDragEnd = ({ over }: DragEndEvent) => {
        setActiveId(null);

        if (over) {
            const overIndex = getIndex(over.id);
            if (activeIndex !== overIndex) {
                const newItems = arrayMove(items, activeIndex, overIndex);
                setItems(newItems);
            }

        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
        >
            <SortableContext
                items={items}
                strategy={rectSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
}