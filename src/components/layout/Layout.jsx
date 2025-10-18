import {Container,Nav} from "react-bootstrap"
import NavBar from "./navBar/NavBar"
const Layout = ({ children }) => {
  return (
    <>
    <NavBar/>
    {children}
    </>
  )
}

export default Layout