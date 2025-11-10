import { useContext } from "react"
import {  Outlet, useNavigate } from "react-router"
import { Image, Col, Row, Button } from "react-bootstrap";
import { AuthContext } from "../../../services/authContext/AuthContext";
import { IsTokenValid } from "../Protected.helper";
import Layout from "../../layout/Layout";

const ProtectedStatus = ({statusNeeded}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const HandleClickButton = () => {
        navigate("/home")
    }
    
    if (!IsTokenValid(user?.token, user?.status, statusNeeded)) {
        return (
            <Layout>
                <Row className="justify-content-md-center p-5">
                    <Col xs={8} className = "">
                        <Image src="https://t3.ftcdn.net/jpg/07/30/13/62/360_F_730136273_MIQk4I8Wnpvw4M3GvmUuyYTVL1RJviHK.jpg" fluid/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center p-5">
                    <Col>
                        <h1> You dont have the permissions to see this screen </h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center p-5">
                    <Col>
                        <Button onClick={HandleClickButton}>
                            Go to Home
                        </Button>
                    </Col>
                </Row>
            </Layout>
        )
    }
    return <Outlet />
}

export default ProtectedStatus