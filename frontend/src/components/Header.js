import { Link } from "react-router-dom";

import LogoutButton from "../components/LogoutButton";

function Header() {
  return (
      <header>
        <div className="header-top">
          <div className="title-and-nav">
            <h1>My recipes app</h1>
            <nav>
              <Link to="/home">Home</Link> |{" "}
              <Link to="/create">Create</Link> |{" "}
              <Link to="/favorites">Favorites</Link> |{" "}
              <Link to="/profile">Profile</Link>
            </nav>
          </div>
          <div className="logout-button-container">
            <LogoutButton />
          </div>
        </div>
        <hr />
      </header>

  );
}

export default Header;
