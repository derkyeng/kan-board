import { useState } from 'react';
import './Board.css';
import TaskList from './TaskList';
import uuid from "uuid/v4";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const itemsFromBackend = [
  { id: uuid(), title: "First task", description: "First Desc" },
  { id: uuid(), title: "Second task", description: "Second Desc"  },
  { id: uuid(), title: "Third task", description: "Third Desc"  },
  { id: uuid(), title: "Fourth task", description: "Fourth Desc"  },
  { id: uuid(), title: "Fifth task", description: "Fifth Desc"  }
];


const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const Board = ({ newTask }) => {
    const [columns, setColumns] = useState(columnsFromBackend);
    console.log(newTask)
    let hasMagenicVendor = itemsFromBackend.some( item => item['id'] === newTask.id)
    console.log(hasMagenicVendor)
    if (!hasMagenicVendor && newTask.id !== 0){
      itemsFromBackend.push(newTask)
    }

    return (
        <div className="board">
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div key={columnId}>
                  <TaskList data={ column } id={ columnId }/>
                </div>
              )
            })}
          </DragDropContext>
        </div>
    );
}
 
export default Board;