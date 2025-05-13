import { Link } from "react-router-dom";
import { Navigation, NavigationBottom } from "../constants/SideBar";
import AccountInfo from "./AccountInfo";

const SideBar = () => {
  return (
    <nav className="w-72 flex flex-col justify-between border-r border-gray">
      <ul className="font-poppins text-md">
        {Navigation.map((item, id) => {
          return (
            <Link to={item.path}>
              <li
                key={id}
                className="w-full flex flex-row items-center px-8 py-4 bg-white border-b border-gray cursor-pointer hover:bg-main hover:font-semibold"
              >
                <span>{item.title}</span>
              </li>
            </Link>
          );
        })}
      </ul>
      <ul className="font-poppins text-md">
        {NavigationBottom.map((item, id) => {
          return (
            <Link to={item.path}>
              <li
                key={id}
                className="w-full flex flex-row items-center px-8 py-4 bg-white border-t border-gray cursor-pointer hover:bg-main hover:font-semibold"
              >
                <span>{item.title}</span>
              </li>
            </Link>
          );
        })}
        <AccountInfo />
      </ul>
    </nav>
  );
};

export default SideBar;
