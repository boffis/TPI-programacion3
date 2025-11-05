import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Container, Row, Col, Card, Spinner } from "react-bootstrap"
import Layout from "../../layout/Layout"
import useFetch from "../../../hooks/useFetch/useFetch"
import { toast } from "react-toastify"

const SysAdmin = () => {
    const { get, isLoading } = useFetch()
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const handleUsersSuccess = (data) => setUsers(data)
    const handleUsersError = (err) => toast(err.message || "Error fetching users")

    const handleProductsSuccess = (data) => setProducts(data)
    const handleProductsError = (err) => toast(err.message || "Error fetching products")

    useEffect(() => {
        get("users", true, handleUsersSuccess, handleUsersError)
        get("products/admin", true, handleProductsSuccess, handleProductsError)
    }, [])

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        )
    }

    const handleUserClick = (id) => navigate(`/user/${id}`)
    const handleProductClick = (id) => navigate(`/detail/${id}`)

    const renderUsers = () => {
        if (!users || users.length === 0) return <p>No users found.</p>
        return users.map((u) => (
            <Col key={u.id} sm={4} className="mb-4">
                <Card
                    className="shadow-sm p-3 hover-scale"
                    onClick={() => handleUserClick(u.id)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Body>
                        <Card.Title>{u.username}</Card.Title>
                        <Card.Subtitle className="text-muted">{u.email}</Card.Subtitle>
                        <Card.Text>Status: {u.status}</Card.Text>
                        <Card.Text>Products: {u.products?.length || 0}</Card.Text>
                        <Card.Text>Purchases: {u.purchases?.length || 0}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }

    const renderProducts = () => {
        if (!products || products.length === 0) return <p>No products found.</p>
        return products.map((p) => (
            <Col key={p.id} sm={3} className="mb-4">
                <Card
                    className="shadow-sm p-3 hover-scale"
                    onClick={() => handleProductClick(p.id)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Img
                        variant="top"
                        src={p.imageURL}
                        style={{
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                    />
                    <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Subtitle className="text-muted">
                            {p.type}
                        </Card.Subtitle>
                        <Card.Text>Price: ${p.price}</Card.Text>
                        <Card.Text>Stock: {p.stock}</Card.Text>
                        <Card.Text>Owner: {p.user?.username || "Unknown"}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }

    return (
        <Layout>
            <Container fluid className="p-4">
                <h2 className="mb-4 text-center">Control Panel</h2>

                <Row className="mb-3">
                    <h4>Users</h4>
                </Row>
                <Row>{renderUsers()}</Row>

                <hr className="my-5" />

                <Row className="mb-3">
                    <h4>Products</h4>
                </Row>
                <Row>{renderProducts()}</Row>
            </Container>
        </Layout>
    )
}

export default SysAdmin
