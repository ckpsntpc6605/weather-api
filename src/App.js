import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Temperature from "./components/Temperature";
import POP from "./components/POP";
import Header from "./components/Header";
import Imformation from "./components/Imformation";
import WeatherDescription from "./components/WeatherDescription";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCloud,
  faSun,
  faCloudSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCloud, faSun, faCloudSun, faCloudShowersHeavy);

const url = `http://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWA-AED89E17-921A-41DE-B60A-5F7DDD80184F&format=JSON&locationName=%E9%B6%AF%E6%AD%8C%E5%8D%80
  `;

function App() {
  const [weather, setWeather] = useState({
    locationName: "鶯歌區",
    temperature: null,
    currentWeather: null,
    POP6: null,
    AT: null,
  });
  const [loading, setLoading] = useState(true);
  async function getWeather() {
    return await fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Res is NOT OK!!");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        return data.records.locations[0].location[0];
      });
  }

  const [temperature, setTemperature] = useState([]);
  const [weatherIcon, setIcon] = useState([]);
  const [pop, setPop] = useState([]);
  const [description, setDescription] = useState("");

  // index Fetch
  useEffect(() => {
    getWeather()
      .then((weatherData) => {
        console.log(weatherData);
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
        setTemperature((prevTemp) =>
          prevTemp.concat(temperatureData.slice(0, 6))
        );

        const weatherIconData = weatherData.weatherElement[1].time;
        setIcon((prevIcon) => prevIcon.concat(weatherIconData.slice(0, 6)));

        const popData = weatherData.weatherElement[7].time;
        setPop((prevPop) => prevPop.concat(popData.slice(0, 6)));

        const descriptionData =
          weatherData.weatherElement[6].time[0].elementValue[0].value;
        setDescription((prevDesc) => `${descriptionData}`);
      })
      .catch((e) => {
        console.log("Error fetching weather data:", e.message);
      });
  }, []);

  return (
    <div className="container">
      <Header weather={weather} loading={loading} />
      <Routes>
        <Route path="/" element={<Imformation />}>
          <Route index element={<Navigate replace to="temperature" />} />
          <Route
            path="temperature"
            element={
              <Temperature
                temperature={temperature}
                weatherIcon={weatherIcon}
                loading={loading}
              />
            }
          />
          <Route path="pop" element={<POP pop={pop} />} />
        </Route>
      </Routes>
      <WeatherDescription description={description} loading={loading} />
    </div>
  );
}

export default App;
