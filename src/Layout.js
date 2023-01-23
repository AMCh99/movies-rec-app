import { Outlet, Link } from "react-router-dom";
import "./CSS/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <p className="navP">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/SearchMovie">
              <p className="navP">SearchMovie</p>
            </Link>
          </li>
          <li>
            <Link to="/MyList">
              <p className="navP">My List</p>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
