import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ weather }) {
  // console.log(weather);
  let weatherIcon;
  if (weather.currentWeather == "晴") {
    weatherIcon = "fa-solid fa-sun";
  } else if (
    weather.currentWeather == "陰" ||
    weather.currentWeather == "多雲"
  ) {
    weatherIcon = "fa-solid fa-cloud";
  } else if (weather.currentWeather == "晴時多雲") {
    weatherIcon = "fa-solid fa-cloud-sun";
  } else if (
    weather.currentWeather == "陣雨" ||
    weather.currentWeather == "短暫雨" ||
    weather.currentWeather == "陰時多雲短暫雨"
  ) {
    weatherIcon = "fa-solid fa-cloud-showers-heavy";
  }
  return (
    <div className="wrap">
      <div className="icon">
        <FontAwesomeIcon icon={weatherIcon} />
      </div>
      <h1 className="temperature">
        {weather.temperature}
        <span>°C</span>
      </h1>
      <div className="info">
        <p className="pop">降雨機率：{weather.POP6}％</p>
        <p className="at">體感：{weather.AT}°C</p>
      </div>
      <div className="location-currentweather">
        <h3 className="location">{weather.locationName}</h3>
        <p className="currentWeather">{weather.currentWeather}</p>
      </div>
    </div>
  );
}
