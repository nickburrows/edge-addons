import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TableEditor = ({ tableData, updateTableData }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tableData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTableData(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table>
        <tbody>
          <Droppable droppableId="table">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tableData.map((row, index) => (
                  <Draggable
                    key={index}
                    draggableId={`row-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </tbody>
      </table>
    </DragDropContext>
  );
};

export default TableEditor;
