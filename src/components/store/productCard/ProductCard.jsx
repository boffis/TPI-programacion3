import {Card} from 'react-bootstrap'

const ProductCard = (product) => {
    const {
        id,
        name,
        imageUrl,
        value,
        stock,
        type
    } = item
    return (
        <Card>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: ${item.price}</Card.Text>
                <Card.Text>Stock: {item.stock}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard 