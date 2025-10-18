import {Navbar,Container,Nav, Button, Image} from "react-bootstrap"
import { useNavigate } from "react-router"
import { FaSignInAlt } from "react-icons/fa";
import Logo from "./Logo.png"

const CustomNavBar = () => {
  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate('/home')
  }

  const handleClickLogin = () => {
    navigate('/login')
  }

  return (
  <Navbar className="bg-body-secondary p-3">
    <Container className="bg-body-tertiary "  fluid>
      <Navbar.Brand onClick={handleClickLogo} className="user-select-none">
        <Image src={Logo} alt="Logo" style={{maxHeight : "80px"}}fluid/>
      </Navbar.Brand> 
      <Nav.Link  href="/store">
      <h3>Store</h3>
      </Nav.Link>
      <FaSignInAlt color="black" size={24} onClick={handleClickLogin} />
    </Container>
  </Navbar>
  )
}

export default CustomNavBar