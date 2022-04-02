import React, {useState, useEffect} from 'react';
import TrainList from './trainList';
import StationList from './stationList';

function App() {
  const [trains, setTrains] = useState(false);
  useEffect(() => {
    gettrain();
  }, []);

  function gettrain() {
    fetch('http://localhost:3001/t')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setTrains(data);
      });
  }

  const [stations, setStations] = useState(false);
  useEffect(() => {
    getstation();
  }, []);
  function getstation() {
    fetch('http://localhost:3001/s')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setStations(data);
      });
  }

  function createtrain() {
    let train_num = prompt('Enter train num');
    let year_in_service = prompt('Enter train year in service')
    let year_built = prompt('Enter train year built')
    let train_id = prompt('Enter train id');
    let train_type = prompt('Enter train type');
    fetch('http://localhost:3001/trains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({train_num, year_in_service, year_built, train_id, train_type}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        gettrain();
      });
  }

  function deletetrain() {
    let train_num = prompt('Enter train num');
    fetch(`http://localhost:3001/trains/${train_num}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        gettrain();
      });
  }

  function createstation() {
    let station_num = prompt('Enter station num');
    let address = prompt('Enter station address')
    let name = prompt('Enter station name')
    fetch('http://localhost:3001/stations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({station_num, address, name}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getstation();
      });
  }

  function deletestation() {
    let station_num = prompt('Enter station num');
    fetch(`http://localhost:3001/stations/${station_num}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getstation();
      });
  }

  return (
    <>
      <p><strong>Trains</strong></p>
      <TrainList trains={trains} /> 
      {/* {trains ? trains : 'There is no train data available'} */}
      <br />
      <button onClick={createtrain}>Add train</button>
      <br />
      <button onClick={deletetrain}>Delete train</button>
      <p><strong>Stations</strong></p>
      <StationList stations={stations} /> 
      {/* {trains ? trains : 'There is no train data available'} */}
      <br />
      <button onClick={createstation}>Add station</button>
      <br />
      <button onClick={deletestation}>Delete station</button>
    </>
  );
}
export default App;