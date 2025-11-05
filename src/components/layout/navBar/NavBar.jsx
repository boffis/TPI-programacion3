import React from "react";
import { useNavigate } from "react-router"

import {Navbar,Container,Nav, Button, Image, Dropdown, NavDropdown} from "react-bootstrap"
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo.png"
import { useContext } from "react";
import { AuthContext } from "../../../services/authContext/AuthContext";
import { CartContext } from "../../../services/cartContext/CartContext";

const CustomNavBar = () => {
  const navigate = useNavigate()

  const {user, onLogout} = useContext(AuthContext);
  const {onBuy} = useContext(CartContext);
  const handleClickLogo = () => {
    navigate('/home')
  }

  const handleClickLogin = () => {
    navigate('/login')
  }
  
  
  
  const CustomToggle = React.forwardRef(({ Children, onClick }, ref) => (
    <FaUserCircle
    style={{cursor:"pointer"}}
    color="black"
    size={30}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    />
  ));
  
  const handleClickCart = () => {
      navigate('/cart')
    }

  const handleClickLogout = () => { 
    navigate("/login")
    onLogout()
    onBuy()
  }

  const handleClickProfile = () => { 
    navigate("/account")
  }
  const handleClickAdmin = () => { 
    navigate("/admin")
  }

const AccountIcons = ()=>{
  if (user) {
    return(
<Dropdown
      drop="start"
      >
        <Dropdown.Toggle as={CustomToggle}
        id="dropdown-custom-components" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleClickProfile}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleClickCart}>Cart</Dropdown.Item>
          {user.status==="SysAdmin"?
          <Dropdown.Item onClick={handleClickAdmin}>Admin Dashboard</Dropdown.Item>:
          null}
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3" onClick={handleClickLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return(
    <FaSignInAlt style={{cursor:"pointer"}} color="black" size={30} onClick={handleClickLogin} />
    )
  }

}

  return (
  <Navbar className="bg-body-danger p-3">
    <Container className="bg-body-tertiary "  fluid>
      <Navbar.Brand style={{cursor:"pointer"}} onClick={handleClickLogo} className="user-select-none">
        <Image src={Logo} alt="Logo" style={{maxHeight : "80px"}}fluid/>
      </Navbar.Brand> 
      <Nav.Link  href="/store" >
      <h3>Store</h3>
      </Nav.Link>
        {AccountIcons()}
      
    </Container>
  </Navbar>
  )
}

export default CustomNavBar