import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Image, Col, Row, Modal, Button, ButtonGroup, Spinner, Form, InputGroup } from "react-bootstrap"
import useFetch from "../../hooks/useFetch/useFetch"
import { CartContext } from "../../services/cartContext/CartContext"
import { toast } from "react-toastify"
import Layout from "../layout/Layout"
import { AuthContext } from "../../services/authContext/AuthContext"
import { FaScrewdriverWrench } from "react-icons/fa6";

const UpdateForm = ({ updateProduct, updateErrors, onChange, onSubmit }) => {
        return(
            <Form noValidate className="p-3 gap-4" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control name="name" value={updateProduct.name} onChange={onChange}/>

                    <Form.Text muted>
                        {updateErrors.name}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>type</Form.Label>
                <Form.Select name="type" value={updateProduct.type} onChange={onChange}>

                    <option value="">-- Select a type --</option>
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessory">Accesory</option>

                </Form.Select>
                    <Form.Text muted>
                        {updateErrors.type}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Price
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control 
                        name="price" 
                        value={updateProduct.price} 
                        onChange={onChange}
                        type="number"
                        min={"0"}
                        step={"0.01"}
                        />
                    </InputGroup>

                    <Form.Text muted>
                        {updateErrors.price}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Stock
                    </Form.Label>

                    <Form.Control 
                    name="stock" 
                    value={updateProduct.stock} 
                    onChange={onChange}
                    type="number"
                    min={"0"}
                    />

                    <Form.Text muted>
                        {updateErrors.stock}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        imageURL
                    </Form.Label>

                    <Form.Control name="imageURL" value={updateProduct.imageURL} onChange={onChange}/>

                    <Form.Text muted>
                        {updateErrors.imageURL}
                    </Form.Text>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>
                        Desc
                    </Form.Label>

                    <Form.Control rows={5} type="text" as={"textarea"} name="desc" value={updateProduct.desc} onChange={onChange}/>

                    <Form.Text muted>
                        {updateErrors.desc}
                    </Form.Text>
                </Form.Group>
                
                <Button type="submit"size="lg" className="mt-5" >
                    Submit product
                </Button>
            </Form>
        )
    }

    const RenderedModal = ({ show, onHide, onDelete, product, updateProduct, updateErrors, onChange, onSubmit }) => {
        return(
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Controller
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm 
                        updateProduct={updateProduct}
                        updateErrors={updateErrors}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                    {(product?.purchases?.length > 0) 
                    ? product.purchases.map (e=>{
                        console.log(JSON.stringify(e))
                        return <p key={e.id}>{e.productPurchase.quantity} item/s purchased by user with id: {e.userId}</p>
                    })
                    : 
                        <p>No purchases found</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onDelete}>DELETE ITEM</Button>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

const ProductDetail = () => {

    const [product, setProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [updateProduct, setUpdateProduct] = useState({})
    const [updateErrors, setUpdateErrors] = useState({})


    const { id } = useParams()
    const {cart, onAdd, onDelete, onUpdate} = useContext(CartContext)
    const {user, onUpdateProduct, onDeleteProduct} = useContext(AuthContext)
    const { get, put, dele, isLoading } = useFetch()
    const navigate = useNavigate()

    useEffect(()=>{
        get(`product/${id}`, true, handleFetchSuccess, handleFetchError)
    }
    ,[])

    const handleFetchSuccess = (data) => {
        console.log(data)
        setProduct(data)
        setUpdateProduct(data)
    }
    const handleFetchError = (data) => {
        console.log(data.message)
    }
    
    
    const isImageUrl = (url) => {
        try {
            new URL(url);

            return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url.split('?')[0]);
        } catch {
            return false;
        }
    };

    const validations = () => {
        const errors = {}
        const expresionRegularName = /^[a-zA-Z0-9_ ]{3,100}$/
        if (updateProduct?.name?.length===0){
            errors.name = "A name is required"
        }else if (expresionRegularName.test(updateProduct.name)){
            errors.name = "Enter a valid name"
        }

        const stockR = updateProduct?.stock.toString()

        if (updateProduct?.stock.length===0){
            errors.stock = "Stock is required"}
        else if (updateProduct?.stock < 1) {
            errors.stock = "Must have at least one item in stock"
        } else if (stockR.includes(".") ){
            errors.stock = "Stock cannot have decimals"
        }

        const priceR = updateProduct?.price.toString()
        if (updateProduct?.price.length===0){
            errors.price = "Price is required"
        }
        else if  (updateProduct?.price < 0) {
            errors.price = "Price cannot be negatice"
        } else if (priceR.includes(".")  && priceR.split(".")[1].length > 2) {
            errors.price = "Only two decimal places allowed"
        }

        if (isImageUrl(updateProduct?.imageURL)) {
            errors.imageURL = "must be an URL to an image"
        }
        
        if (updateProduct?.desc.length===0) {
            errors.desc="Add a description"
        }

        setUpdateErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleUpdateChangeInput = (e) => {
        const {name, value} = e.target
        setUpdateProduct((lastObj)=>{
            return({
                ...lastObj,
                [name] : value
            })
        })
        
    }

    const handleUpdateSuccess = (res) =>{
        onUpdateProduct(updateProduct)
        setProduct(updateProduct)
        toast(res.message)

    }

    const handleUpdateError = (res) => {
        toast(res.message)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("ran submit")
        if (validations()) {
            console.log("good validations")
            
            put(
                `product/${product.id}`,
                true,
                updateProduct,
                handleUpdateSuccess,
                handleUpdateError
            )
        }
    }


    const handleProductDelete = () => {
        dele(`product/${product.id}`, true, handleDeleteSuccess, handleDeleteError)
    }

    const handleDeleteSuccess = (data) =>{
        toast(data.message)
        onDeleteProduct(product.id)
        navigate("/store")
    }

    const handleDeleteError = (data) => {
        toast(data.message)
    }


    const renderCartButtons = () => {
        const cartItem = cart?.find((item) => item.id === product.id);;

        if (!cartItem) {
            return (
            <Button
                variant="success"
                size="lg"
                onClick={() => onAdd(product)}
                disabled={product.stock === 0 || product.deleted}
            >
                {product.stock === 0 || product.deleted ? "Unavailable" : "Add to cart"}
            </Button>
            );
        }

        return (
            <ButtonGroup size="lg">
            <Button
                variant="outline-secondary"
                onClick={() => onUpdate(product.id, false)}
            >
                −
            </Button>

            <Button variant="light" disabled>
                {cartItem.quantity}
            </Button>

            <Button
                variant="outline-secondary"
                onClick={() => onUpdate(product.id, true)}
                disabled={cartItem.quantity >= product.stock}
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
    };



    if (isLoading) {
        return (
            <Spinner animation="grow"/>
        )
    }

    if (!product) {
        return(
            <Layout>
                <Row>
                    <h1>
                        No product found
                    </h1>
                </Row>
            </Layout>
        )
    }

    return(
        <Layout>
        <>
        <Row className="align-items-stretch">
        <Col className="d-flex flex-column justify-content-between p-5">
            {user.status==="SysAdmin" || user.id === product?.user?.id
            ?<FaScrewdriverWrench onClick={()=>setShowModal(true)}/>
            :null}
            <h6>Published by <u style={{cursor:"pointer"}} onClick={()=>{navigate(`/user/${product?.userId}`)}}>{product?.user?.username}</u></h6>
            <Row >
                <h1>{product.name}</h1>
            </Row>
            <Row  className="border flex-grow-1 p-2">
                <p>
                    {product.desc}
                </p>
            </Row>
            <Row className="mt-2">
                <Col>
                <h5> Price: ${product.price} </h5>
                </Col>
                <Col>
                <h6> Stock: {product.stock} </h6>
                </Col>
            </Row>
        </Col>
        <Col >
            <Row className="m-2 justify-content-center">
                <Image  
                    src={product.imageURL} 
                    fluid 
                    style={{ maxHeight: "500px", width:"auto", objectFit: "cover" }} 
                />
            </Row>
            <Row className="m-2">
                {renderCartButtons()}
            </Row>
        </Col>
        </Row>
        
        <RenderedModal
            show={showModal}
            onHide={() => setShowModal(false)}
            product={product}
            updateProduct={updateProduct}
            updateErrors={updateErrors}
            onChange={handleUpdateChangeInput}
            onSubmit={handleSubmit}
            onDelete={handleProductDelete}
        />
        </>
        </Layout>
    )
}

export default ProductDetail