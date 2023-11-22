
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
 

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        className="justify-content-center"
        fixed="top"
      >
        <Nav>
          <NavLink to="/tasklist" className="nav-link">
            TaskList
          </NavLink>
          <NavLink to="/taskdetails" className="nav-link">
            TaskDetails
          </NavLink>
        </Nav>
        
      </Navbar>
    </div>
  );
};

export default NavBar;
