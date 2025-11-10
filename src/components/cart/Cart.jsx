import { useContext } from "react"
import { CartContext } from "../../services/cartContext/CartContext"
import { Row, Col, Card, Image, Button, ButtonGroup } from "react-bootstrap"
import Layout from "../layout/Layout"
import useFetch from "../../hooks/useFetch/useFetch"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { AuthContext } from "../../services/authContext/AuthContext"


const Cart = () => {

    const {cart, onBuy, onDelete, onUpdate} = useContext(CartContext)
    const {onAddPurchase} = useContext(AuthContext)
    const { post, isLoading} = useFetch()
    
    const navigate = useNavigate()


    const handleBuy = () => {
        console.log(cart)
        post ("purchase", 
            true,
            {products:cart}, 
            handlePostSuccess, 
            handlePostError)
    }

    const handlePostSuccess = (data) => {
        toast(data.message)
        console.log(data.purchase)
        onAddPurchase(data.purchase)
        onBuy()

    }
    
    const handlePostError = (data) => {
        toast(data.message)
    }



const handleClickCard = (id) => {
        navigate(`/detail/${id}`)
    }


    const renderCartButtons= (product) => {
        
        return (
            <ButtonGroup >
            <Button
                variant="outline-secondary"
                onClick={() => onUpdate(product.id, false)}
            >
                −
            </Button>

            <Button variant="light" disabled>
                {product.quantity}
            </Button>

            <Button
                variant="outline-secondary"
                onClick={() => onUpdate(product.id, true)}
                disabled={product.quantity >= product.stock}
            >
                +
            </Button>

            <Button
                variant="danger"
                onClick={() => onDelete(product.id)}
            >
                Remove
            </Button>
            </ButtonGroup>
        );
    }

    const renderedCartProducts = cart.map((e)=>{

        return (
            <Card  className="m-3 p-2" >
                <Row>
                    <Row onClick={()=>handleClickCard(e.id)}>
                        <Col>
                        <Image
                        src = {e.imageURL}
                        style={{height:"100px", width:"auto"}}
                        />
                        <h3>{e.name}</h3>
                        </Col>
                        <Col>
                        <h5>price: {e.price}</h5>
                        <h6>stock: {e.stock}</h6>
                        <h6>subtotal: {e.price*e.quantity}</h6>
                        </Col>
                    </Row>
                    {renderCartButtons(e)}
                </Row>
            </Card>
        )
    })

    let total = 0

    for (const e of cart) {
        total = total + (e?.quantity*e?.price)
    }

    return(
        <Layout>
            <Row className="pe-4">
                {cart?.length>0
                ?renderedCartProducts
                :<h3>Your cart is empty... Go fill it!</h3>}
            </Row>
                <Row>  
                    <Col md={{ span: 4, offset: 1 }}>
                            {cart?.length>0
                            ? 
                            <div className="d-grid gap-2">
                                
                                <h2>Total:{total}</h2>

                                <Button
                                    variant="success"
                                    className="m-5"
                                    size="lg"
                                    onClick={handleBuy}
                                    >
                                    Buy
                                </Button>

                            </div>
                            :null}
                    </Col>
                </Row>
        </Layout>
    )

}

export default Cart