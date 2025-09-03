import { Link } from "react-router-dom";

import LogoutButton from "../components/LogoutButton";

function Header() {
  return (
      <header>
        <div id="title-and-nav-id">
        <h1>My recipes app</h1>
        <div id="nav-container-id">
          <nav id="nav-id">
            <Link to="/home">Home</Link>
            {" | "}
            <Link to="/create">Create</Link>
            {" | "}
            <Link to="/favorites">Favorites</Link>
            {" | "}
            <Link to="/profile">Profile</Link>
          </nav>

        <hr></hr>
        </div>
        </div>
        <div id="logout-button-container-id">
          <LogoutButton />
        </div>
      </header>
  );
}

export default Header;
