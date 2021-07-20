import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import './TaskList.css';

const TaskList = ({ data, id }) => {
    return (
        <div key={ id } className="task-list">
            <h2 id="title">{ data.name }</h2>
            <Droppable droppableId={ id } key={ id }>
                {(provided, snapshot) => {
                    return(
                        <div className='drop-area' {...provided.droppableProps} ref={provided.innerRef} 
                        style={{
                            background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#ebecf0",
                            }}>
                            {data.items.map((item, index) => {
                                return (
                                    <div key={ item.id }>
                                        <Task item={item} index={index}/>
                                    </div>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}
 
export default TaskList;
