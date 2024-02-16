import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Temperature({ temperature, weatherIcon }) {
  const temperatureList = temperature.map((tem) => {
    return [tem.dataTime.slice(11, 13), tem.elementValue[0].value];
  });

  let weatherIconList = weatherIcon.map((icon) => {
    const weather = icon.elementValue[0].value;
    switch (weather) {
      case "晴":
        return "fa-solid fa-sun";
      case "陰":
      case "多雲":
        return "fa-solid fa-cloud";
      case "晴時多雲":
        return "fa-solid fa-cloud-sun";
      case "陣雨":
      case "短暫雨":
      case "陰時多雲短暫雨":
        return "fa-solid fa-cloud-showers-heavy";
      default:
        return "";
    }
  });
  //   console.log(weatherIconList);

  return (
    <div className="temp-imform">
      <ul>
        {temperatureList.map((element, index) => (
          <li key={index}>
            <p>{element[0]}時</p>
            <FontAwesomeIcon icon={weatherIconList[index]} />
            <p>{element[1]}°</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
