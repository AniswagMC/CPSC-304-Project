import React, {useState, useEffect} from 'react';

function App() {
  const [trains, setTrains] = useState(false);
  useEffect(() => {
    getTrain();
  }, []);
  function getTrain() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setTrains(data);
      });
  }
  function createTrain() {
    let num = prompt('Enter train num');
    let y_service = prompt('Enter train year in service')
    let y_built = prompt('Enter train year built')
    let id = prompt('Enter train id');
    let type = prompt('Enter train type');
    fetch('http://localhost:3001/trains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({num, y_service, y_built, id, type}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log("cheetos");
        alert(data);
        getTrain();
      });
  }
  function deleteTrain() {
    let num = prompt('Enter train num');
    fetch(`http://localhost:3001/trains/${num}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getTrain();
      });
  }
  return (
    <div>
      {trains ? trains : 'There is no train data available'}
      <br />
      <button onClick={createTrain}>Add train</button>
      <br />
      <button onClick={deleteTrain}>Delete train</button>
    </div>
  );
}
export default App;

// export default function App() {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//             <p>This is a boilerplate for a React app.</p>
//         </div>
//     );
// }
