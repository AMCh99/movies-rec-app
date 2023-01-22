import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SearchMovie">SearchMovie</Link>
          </li>
          <li>
            <Link to="/MyList">MyList</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
