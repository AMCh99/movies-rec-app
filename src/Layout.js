import { Outlet, Link } from "react-router-dom";

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
              <p className="navP">My Favourites</p>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
