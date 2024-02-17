import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Header({ weather, loading }) {
  // console.log(weather);
  let weatherIcon;
  if (weather.currentWeather === "晴") {
    weatherIcon = "fa-solid fa-sun";
  } else if (
    weather.currentWeather === "陰" ||
    weather.currentWeather === "多雲"
  ) {
    weatherIcon = "fa-solid fa-cloud";
  } else if (weather.currentWeather === "晴時多雲") {
    weatherIcon = "fa-solid fa-cloud-sun";
  } else if (
    weather.currentWeather === "陣雨" ||
    weather.currentWeather === "短暫雨" ||
    weather.currentWeather === "陰時多雲短暫雨"
  ) {
    weatherIcon = "fa-solid fa-cloud-showers-heavy";
  }
  return (
    <div className="wrap">
      <div className="icon">
        {loading ? (
          <Skeleton
            circle
            width={40}
            height={40}
            duration={2}
            baseColor="#aaa"
            highlightColor="#ccc"
          />
        ) : (
          <FontAwesomeIcon icon={weatherIcon} />
        )}
      </div>
      <h1 className="temperature">
        {weather.temperature}
        <span>°C</span>
      </h1>
      <div className="info">
        <p className="pop">
          降雨機率：
          {loading ? (
            <Skeleton
              width={25}
              duration={2}
              baseColor="#aaa"
              highlightColor="#ccc"
            />
          ) : (
            weather.POP6 + "％"
          )}
        </p>
        <p className="at">
          體感：
          {loading ? (
            <Skeleton
              width={25}
              duration={2}
              baseColor="#aaa"
              highlightColor="#ccc"
            />
          ) : (
            weather.AT + "°C"
          )}
        </p>
      </div>
      <div className="location-currentweather">
        <h3 className="location">{weather.locationName}</h3>
        <p className="currentWeather">{weather.currentWeather}</p>
      </div>
    </div>
  );
}
