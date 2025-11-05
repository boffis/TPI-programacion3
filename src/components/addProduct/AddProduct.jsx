import { useState } from "react"
import Layout from "../layout/Layout"
import { Form, Button, InputGroup } from "react-bootstrap"
import useFetch from "../../hooks/useFetch/useFetch"
import { useContext } from "react"
import { AuthContext } from "../../services/authContext/AuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const AddProduct = () => {

    const [errors, setErrors] = useState({})
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("0")
    const [stock, setStock] = useState("0")
    const [imageURL, setImageURL] = useState("")
    const [type, setType] = useState("")

    const navigate = useNavigate()
    const {post} = useFetch()
    const {user, onAddProduct} = useContext(AuthContext)

    const handleChangeInput = (e) => {
    const {name, value} = e.target
    switch(name) {
        case "name":
            setName(value)
            break
        case "desc":
            setDesc(value)
            break
        case "price":
            setPrice(value)
            break
        case "stock":
            setStock(value)
            break
        case "imageURL":
            setImageURL(value)
            break
        case "type":
            setType(value)
            break
    }
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
        const expresionRegularName = /^[a-zA-Z0-9_]{3,100}$/
        if (!name.length){
            errors.name = "A name is required"
        }else if (!expresionRegularName.test(name)){
            errors.name = "Enter a valid name"
        }

        const stockR = stock.replace(",", ".")

        if (!stock.length){
            errors.stock = "Stock is required"}
        else if (stock < 1) {
            errors.stock = "Must have at least one item in stock"
        } else if (stockR.includes(".") ){
            errors.stock = "Stock cannot have decimals"
        }

        const priceR = price.replace(",", ".")
        if (!price.length){
            errors.price = "Price is required"
        }
        else if  (price < 0) {
            errors.price = "Price cannot be negatice"
        } else if (priceR.includes(".")  && priceR.split(".")[1].length > 2) {
            errors.price = "Only two decimal places allowed"
        }

        if (isImageUrl(imageURL)) {
            errors.imageURL = "must be an URL to an image"
        }
        
        if (!desc.length) {
            errors.desc="Add a description"
        }

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const onSubmitSuccess = (res) =>{
        onAddProduct({
            id: res.productId,
            name,
            stock,
            price,
            desc,
            type,
            imageURL
        })
        toast(res.message)
        navigate("/account")

    }

    const onSubmitError = (res) => {
        toast(res.message)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("ran submit")
        if (validations()) {
        console.log("good validations")

            post(
                "product",
                true,
                {
                    name,
                    stock,
                    price,
                    desc,
                    imageURL,
                    type
                },
                onSubmitSuccess,
                onSubmitError
            )
        }
    }

    return(
        <Layout>
            <Form noValidate className="p-3 gap-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control name="name" value={name} onChange={handleChangeInput}/>

                    <Form.Text muted>
                        {errors.name}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>type</Form.Label>
                <Form.Select name="type" value={type} onChange={handleChangeInput}>

                    <option value="">-- Select a type --</option>
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessory">Accesories</option>

                </Form.Select>
                    <Form.Text muted>
                        {errors.type}
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
                        value={price} 
                        onChange={handleChangeInput}
                        type="number"
                        min={"0"}
                        step={"0.01"}
                        />
                    </InputGroup>

                    <Form.Text muted>
                        {errors.price}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Stock
                    </Form.Label>

                    <Form.Control 
                    name="stock" 
                    value={stock} 
                    onChange={handleChangeInput}
                    type="number"
                    min={"0"}
                    />

                    <Form.Text muted>
                        {errors.stock}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        imageURL
                    </Form.Label>

                    <Form.Control name="imageURL" value={imageURL} onChange={handleChangeInput}/>

                    <Form.Text muted>
                        {errors.imageURL}
                    </Form.Text>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>
                        Desc
                    </Form.Label>

                    <Form.Control rows={5} type="text" as={"textarea"} name="desc" value={desc} onChange={handleChangeInput}/>

                    <Form.Text muted>
                        {errors.desc}
                    </Form.Text>
                </Form.Group>
                
                <Button type="submit"size="lg" className="mt-5" >
                    Submit product
                </Button>
            </Form>
        </Layout>
    )

}

export default AddProduct