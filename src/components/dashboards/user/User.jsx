import { useContext } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { AuthContext } from "../../../services/authContext/AuthContext"
import { useNavigate } from "react-router"
import Layout from "../../layout/Layout"
import { FaTrashAlt } from 'react-icons/fa';
import useFetch from "../../../hooks/useFetch/useFetch"
import { toast } from "react-toastify"

const User = () => {

    
    const {user, handleApplySeller} = useContext(AuthContext)
    const navigate = useNavigate()
    const {put} = useFetch()

    const onClickAddProduct = () => {
        navigate("/newProduct")
    }

    const onApplySuccess = (res) => {
        handleApplySeller()
    }
    
    const onApplyError = (res) => {
        toast(res.message)
    }
    const onClickApplySeller = () => {
        put(
            `user/${user.id}`,
            true, 
            {status:"Seller"},
            onApplySuccess,
            onApplyError
        )
    }

    const purchasesRendered = () => {
        if (user.purchases && user.purchases.length !== 0) {
            return(
                <p>
                    there are purchases lmao
                </p>
            )
        } 
        return(
            <p>
                {"No purchases found :("}
            </p>
        )
    }

    const productsRendered = () => {
        if (user.status === "Buyer") {
            return(
                <Container>
                    <Row fluid>
                        <h1>
                            Have something to sell?
                        </h1>
                    </Row>
                
                    <Row>
                        <Col sm={2} className="justify-center">
                        <h4 style={{textAlign:"center"}}>
                        Become a seller today!
                        </h4>
                        </Col>
                        <Col>
                        <Button onClick={onClickApplySeller} >
                            Apply!
                        </Button>
                        </Col>
                    </Row>
                </Container>
            )
        }
        if (user.products && user.products.length !== 0) {
            return(
                <p>
                    there are products lmao
                </p>
            )
        } 
        return(
            <p>
                {"No products found :("}
            </p>
        )
    }


    return (
        <Layout>
            <Row className="mb-4 ">
                <Col>
                <h1>Hi there, {user.username}</h1>
                </Col>
            </Row>

            <Row>
                <h4>
                    Your purchases
                </h4>

            </Row>
            <Row>
                {purchasesRendered()}
            </Row>
            {user.status!=="Buyer"?
            <>
            <Row>
                <h4>
                    Your products
                </h4>

            </Row>
            <Row>
                <Col>
                    <Button onClick={onClickAddProduct} variant="primary" size="sm">
                        Add product
                    </Button>
                </Col>
            </Row> 
            </>
            :null}
            <Row>
                {productsRendered()}
            </Row>
        </Layout>
    )
}

export default User