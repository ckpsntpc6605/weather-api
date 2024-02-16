import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Temperature from "./components/Temperature";
import POP from "./components/POP";
import Header from "./components/Header";
import Imformation from "./components/Imformation";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCloud,
  faSun,
  faCloudSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCloud, faSun, faCloudSun, faCloudShowersHeavy);

function App() {
  const url = `http://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWA-AED89E17-921A-41DE-B60A-5F7DDD80184F&format=JSON&locationName=%E9%B6%AF%E6%AD%8C%E5%8D%80
  `;
  const [weather, setWeather] = useState({
    locationName: "鶯歌區",
    temperature: null,
    currentWeather: null,
    POP6: null,
    AT: null,
  });

  function getWeather() {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Res is NOT OK!!");
        }
        return res.json();
      })
      .then((data) => data.records.locations[0].location[0]);
  }

  const [temperature, setTemperature] = useState([]);
  const [weatherIcon, setIcon] = useState([]);
  const [pop, setPop] = useState([]);

  // index Fetch
  useEffect(() => {
    getWeather()
      .then((weatherData) => {
        // console.log(weatherData);
        const currentData = (num) => {
          return weatherData.weatherElement[num].time[0].elementValue[0].value;
        };
        setWeather((prevWeather) => {
          return {
            ...prevWeather,
            currentWeather: currentData(1),
            temperature: currentData(3),
            POP6: currentData(7),
            AT: currentData(2),
          };
        });

        const temperatureData = weatherData.weatherElement[3].time;
        setTemperature((prevTemp) => {
          return prevTemp.concat(temperatureData.slice(0, 6));
        });

        const weatherIconData = weatherData.weatherElement[1].time;
        setIcon((prevIcon) => {
          return prevIcon.concat(weatherIconData.slice(0, 6));
        });

        const popData = weatherData.weatherElement[7].time;
        setPop((prevPop) => prevPop.concat(popData.slice(0, 6)));
      })
      .catch((e) => {
        console.log("Error fetching weather data:", e.message);
      });
  }, []);

  return (
    <div className="container">
      <Header weather={weather} />
      <Routes>
        <Route path="/" element={<Imformation />}>
          <Route index element={<Navigate replace to="temperature" />} />
          <Route
            path="temperature"
            element={
              <Temperature
                temperature={temperature}
                weatherIcon={weatherIcon}
              />
            }
          />
          <Route path="pop" element={<POP pop={pop} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
