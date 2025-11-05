import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"
import "./ProductCard.css" // agregá esta línea

const ProductCard = ({ product }) => {
    const { id, imageURL, price, name, deleted = false, stock } = product
    const navigate = useNavigate()

    const handleClickCard = () => {
        navigate(`/detail/${id}`)
    }

    let border = ""
    if (stock === 0 || deleted) {
        border = "danger"
    }

    

    return (
    <Card
        border={border}
        onClick={handleClickCard}
        className="m-2 product-card"
    >
        <div className="image-container mt-2">
            <Card.Img variant="top" src={imageURL} />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
        <div>
            <Card.Title className="mb-2 text-truncate">{name}</Card.Title>
            <Card.Subtitle className="text-muted">${price}</Card.Subtitle>
        </div>
        </Card.Body>
    </Card>
)
}

export default ProductCard
