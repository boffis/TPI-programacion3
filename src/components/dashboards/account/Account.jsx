import { useContext } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { AuthContext } from "../../../services/authContext/AuthContext"
import { useNavigate } from "react-router"
import Layout from "../../layout/Layout"
import { FaTrashAlt } from 'react-icons/fa';
import useFetch from "../../../hooks/useFetch/useFetch"
import { toast } from "react-toastify"
import ProductCard from "../../shared/productCard/ProductCard"

const Account = () => {

    
    const {user, handleApplySeller, onLogout} = useContext(AuthContext)
    const navigate = useNavigate()
    const {put, dele} = useFetch()

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

// should make a modal
    const handleDeleteAccount = () => {
        dele(
            `user/${user.id}`,
            true,
            handleDeleteSuccess,
            handleDeleteError
        )
    }

    const handleDeleteSuccess = (data) => {
        toast(data.message)
        onLogout()
    }

    const handleDeleteError = (data) => {
        toast(data.message)
    }
    const purchasesRendered = () => {
        if (user.purchases && user.purchases.length !== 0) {
            return(
                user.purchases.map((purchase, i)=>{
                    console.log(JSON.stringify(user.purchases))
                    return(
                        <Card fluid className="m-5">
                            <h3>Purchase #{i+1}</h3>
                            {purchase.products.map(product=>{
                                return(

                                    <Container className="">
                                        <h4>{product.name}</h4>
                                        <h6>Quantity: {product.productPurchase.quantity}</h6>
                                        <h6>Subtotal: {product.productPurchase.subtotal}</h6>
                                    </Container>
                                )
                            })}
                            Total: {purchase.total}
                        </Card>
                    )
                })
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
                    user.products.map(e=>{
                        return(
                            <ProductCard product={e}/>
                        )
                        }
                )
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
                <Col sm={{offset:8}}>
                <Button variant="danger" onClick={handleDeleteAccount} className="mt-5">
                    Delete Account
                </Button>
                </Col>
            </Row>

            <Row>
                <h4>
                    Your purchases
                </h4>

            </Row>
            <Row>
                <Col sm={{span:10 }}>
                {purchasesRendered()}
                </Col>
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

export default Account