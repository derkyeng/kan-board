import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import Board from './Board';
import Modal from './Modal';
import { useState, useEffect } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({id: 0});

  const [lists, setLists] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setLists(data)
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="content">
          <button id="addTask" onClick={() => setOpenModal(true)} style={{zIndex:1000}}>Open Modal</button>
          <Modal open={ openModal } onClose={() => setOpenModal(false)} onSubmit={(lists) => {
            if (lists.submit === 1) {
              setModalData(lists);
              console.log(lists)
            }
            setOpenModal(false);
          }}/>
          {!lists ? 'loading' : <Board newTask={ modalData } lists={lists}/>}
        </div>
      </Router>
    </div>
  );
}

export default App;
