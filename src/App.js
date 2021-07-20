import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import Board from './Board';
import Modal from './Modal';
import { useState, useEffect } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({id: 0});

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    
    fetch("/database", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(modalData)
    })
    .then((result) => result.json())
    .then((info) => {console.log(info);})
  }, [modalData]);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="content">
          <p>{!data ? "Loading..." : data}</p>
          <button id="addTask" onClick={() => setOpenModal(true)} style={{zIndex:1000}}>Open Modal</button>
          <Modal open={ openModal } onClose={() => setOpenModal(false)} onSubmit={(data) => {
            if (data.submit === 1) {
              setModalData(data);
            }
            setOpenModal(false);
          }}/>
          <Board newTask={ modalData }/>
        </div>
      </Router>
    </div>
  );
}

export default App;
