import { Outlet, NavLink } from "react-router-dom";
export default function Imformation() {
  return (
    <div className="weather-list">
      <ul>
        <li>
          <NavLink to="temperature">氣溫</NavLink>
        </li>
        <li>
          <NavLink to="pop">降雨機率</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
