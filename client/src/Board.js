import { useEffect, useState } from 'react';
import './Board.css';
import TaskList from './TaskList';
import { DragDropContext } from "react-beautiful-dnd";

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
  console.log(columns)
};

const Board = ({ newTask, lists }) => {
    const [columns, setColumns] = useState(lists);
    const [task, setTask] = useState({id: 0});

    if (newTask.id !== task.id){
      setTask(newTask);
      console.log("NEW TASK", newTask)
    }

    useEffect(() => {
      console.log("Added Task")
      console.log(task)
      fetch("/add", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setColumns(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, [task]);

    useEffect(() => {
      fetch("/update", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(columns)
      })
      .then(res => res.json())
      .then(data => {
        console.log('Updated:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, [columns]);

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