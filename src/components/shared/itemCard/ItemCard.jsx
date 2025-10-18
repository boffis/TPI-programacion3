import {Card} from 'react-bootstrap'

const ItemCard = ({ item }) => {
    
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

export default ItemCard 