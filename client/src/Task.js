import { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import './Task.css';

const Task = ({item, index}) => {
    const [showDetails, setShowDetails] = useState(true)
    const onClick = () => setShowDetails(!showDetails)
    
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                        style={{
                            userSelect: "none",
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            ...provided.draggableProps.style
                    }}>
                        <div className={`task${showDetails ? "" : "-hidden"}`} onClick={onClick}>
                            <div>
                                {showDetails ? 
                                    (<div className="collapse">
                                        <h2>{item.title}</h2>
                                        <h2>{item.description}</h2>
                                    </div>) 
                                :
                                    (<div className="expand">
                                        <h2>{item.title}</h2>
                                        <h2>{item.description}</h2>
                                        <h2>{item.description}</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }}
        </Draggable>
    );
}
 
export default Task;