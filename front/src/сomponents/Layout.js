import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="navbar">
        <ul className="nav-links">
            <Link className="logo" to="/">Home</Link>
            <Link to="/therapists">Therapists</Link>
            <Link to="/calendar">Calendar</Link>
        </ul>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;