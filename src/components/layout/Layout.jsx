import {Container,Nav} from "react-bootstrap"
import NavBar from "./navBar/NavBar"
const Layout = ({ children }) => {
  return (
    <>
    <NavBar/>
    <Container className="border">
    {children}
    </Container>
    </>
  )
}

export default Layout