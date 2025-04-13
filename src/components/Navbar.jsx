import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 15px;
  color: #333;
  text-decoration: none;
  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/company"></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/work-guide"></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/installation"></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/notice"></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/estimate"></NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar; 