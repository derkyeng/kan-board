import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Board from './Board';
import Modal from './Modal';
import { useContext, useEffect, useState, useRef } from 'react';
import uuid from "uuid/v4";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({id: 0});

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="content">
          <button id="addTask" onClick={() => setOpenModal(true)}>Open Modal</button>
          <Modal open={ openModal } onClose={() => setOpenModal(false) } onSubmit={(data) => {
            console.log(modalData);
            console.log(openModal);
            console.log(data);
            if (data.submit === 1) {
              setModalData(data);
            }
            setOpenModal(false);
          }}/>
          <Board newTask={modalData}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
