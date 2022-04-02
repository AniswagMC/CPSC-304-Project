CREATE TABLE Trains (
    train_num INT,
    year_in_service INT,
    year_built INT,
    train_id TEXT,
    train_type TEXT NOT NULL,
    PRIMARY KEY (train_num),
    UNIQUE (train_id) 
);

CREATE TABLE stations (
    station_num INT,
    address TEXT,
    name TEXT,
    PRIMARY KEY (station_num)
);

CREATE TABLE Visits (
    train_num INT,
    station_num INT,
    arrivaltime TIME,
    PRIMARY KEY (train_num, station_num),
    FOREIGN KEY (train_num) REFERENCES Trains, FOREIGN KEY (station_num) REFERENCES Stations
);

-- Join Query:
SELECT t.train_id 
FROM trains t, visits v 
WHERE t.train_id == v.train_id & v.arrival_time == 9:30 -- grab trains that arrive at a station at 9:30

-- Aggregation Query: 
SELECT MAX(price) 
FROM tickets -- find the most expensive ticket

-- Group-by Query: 
SELECT MAX(v.depart_time) 
FROM trains t, visits v 
WHERE t.train_id = v.train_id 
GROUP BY train (find the latest depart_time for each train)

-- Division Query: 
SELECT t.trainid 
FROM trains t 
WHERE NOT EXISTS (
    (SELECT s.station# 
    FROM Stations s EXCEPT (
        SELECT v.station_# 
        FROM visits v 
        WHERE v.train_id = t.train_id)) -- find the trains that visit all the stations
