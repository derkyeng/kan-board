import { useState } from 'react';
import ReactDom from 'react-dom';
import './Modal.css';
import uuid from "uuid/v4";

const Modal = ({ open, onClose, onSubmit}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const submit = 1;
    const id = uuid();
    
    const validateForm = (title, description) => {
      if (title.length === 0 || description.length === 0){
        return
      }
      else{
        onSubmit({title, description, submit, id});
        setTitle("");
        setDescription("");
      }
    }
    
    if (!open) return null

    return ReactDom.createPortal(
    <>
        <div className="overlay" onClick={onClose}/>
        <div className="modal">
          <form>
          <label><h2>Title:</h2></label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <label><h2>Description:</h2></label>
                <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <button type="button" onClick={() => {
                  validateForm(title, description);
                }}>Submit</button>
          </form>
        </div>
      </>,
      document.getElementById('portal')
    );
}
 
export default Modal;