import React, {useState, useEffect} from 'react';
import TrainList from './trainList';
import StationList from './stationList';
import VisitList from './visitList';

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

  const [tjoin, settjoin] = useState(false);
  useEffect(() => {
    gettjoin();
  }, []);
  function gettjoin() {
    fetch('http://localhost:3001/tjoin')
      .then(response => {
        return response.text();
      })
      .then(data => {
        settjoin(data);
      });
  }
  const [gbyq, setgbyq] = useState(false);
  useEffect(() => {
    getgbyq();
  }, []);
  function getgbyq() {
    fetch('http://localhost:3001/gbyq')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setgbyq(data);
      });
  }
  const [div, setdiv] = useState(false);
  useEffect(() => {
    getdiv();
  }, []);
  function getdiv() {
    fetch('http://localhost:3001/div')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setdiv(data);
      });
  }
  const [maxs, setmaxs] = useState(false);
  useEffect(() => {
    getmaxs();
  }, []);
  function getmaxs() {
    fetch('http://localhost:3001/maxs')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setmaxs(data);
      });
  }
  // trains before 2000
  const [trains2000, settrains2000] = useState(false);
  useEffect(() => {
    gettrain2000();
  }, []);
  function gettrain2000() {
    fetch('http://localhost:3001/t2000')
      .then(response => {
        return response.text();
      })
      .then(data => {
        settrains2000(data);
      });
  }
  const [stations, setstations] = useState(false);

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

  const [visits, setvisits] = useState(false);
  useEffect(() => {
    getvisit();
  }, []);
  function getvisit() {
    fetch('http://localhost:3001/v')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setvisits(data);
      });
  }
  const [visitsatime, setvisitsatime] = useState(false);
  useEffect(() => {
    getvisitatime();
  }, []);
  function getvisitatime() {
    fetch('http://localhost:3001/vatime')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setvisitsatime(data);
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

  function createvisit() {
    let train_num = prompt('Enter train num');
    let station_num = prompt('Enter station num')
    let arrival_time = prompt('Enter visit time')
    let depart_time = prompt('Enter depart time')
    fetch('http://localhost:3001/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({train_num, station_num, arrival_time, depart_time}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getvisit();
      });
  }
  function deletevisit() {
    let train_num = prompt('Enter train num');
    let station_num = prompt('Enter station num')
    fetch(`http://localhost:3001/visits/${train_num, station_num}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getvisit();
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
      <p>Trains made before 2000 (projection):</p>
      <TrainList trains={trains2000}/>
      <p>Trains that arrive at a station at 9:30 (join query: train_id is only in trains):</p>
      <TrainList trains={tjoin}/>
      <p>Max station_num (aggregation query):</p>
      <StationList stations={maxs}/>
      <p>Latest depart time for each train (group by query):</p>
      <TrainList trains={gbyq}/>
      <p>find the trains that visit all the stations( division query):</p>
      <TrainList trains={div}/>
      {/* {trains ? trains : 'There is no train data available'} */}
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
      <p><strong>Visits</strong></p>
      {/* <VisitList visits={visits} />  */}
      {visits ? visits : 'There is no train data available'}
      <p>Visits Arrival Time (selection):</p>
      {visitsatime ? visitsatime : 'There is no train data available'}
      <br />
      <button onClick={createvisit}>Add visit</button>
      <br />
      {/* <button onClick={deletevisit}>Delete visit</button> */}

    </>
  );
}
export default App;