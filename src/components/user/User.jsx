import { useNavigate, useParams } from "react-router"
import useFetch from "../../hooks/useFetch/useFetch"
import Layout from "../layout/Layout"
import { useEffect, useState, useContext } from "react"
import { Spinner, Row, Col, Container, Card, Button } from "react-bootstrap"
import { AuthContext } from "../../services/authContext/AuthContext"
import ProductCard from "../shared/productCard/ProductCard"
import { toast } from "react-toastify"

const UserPage = () => {
    const { id } = useParams()
    const { get, put, dele, isLoading } = useFetch()
    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()
    // ✅ Handlers
    const handleGetSuccess = (data) => setCurrentUser(data)
    const handleGetError = (err) => toast(err.message || "Error fetching user")

    useEffect(() => {
        get(`user/${id}`, true, handleGetSuccess, handleGetError)
    }, [id])

    // ✅ Delete user (solo SysAdmin)
    const handleDeleteUser = () => {
        if (!window.confirm("Are you sure you want to delete this account?")) return
        dele(`user/${id}`, true, handleDeleteSuccess, handleDeleteError)
    }

    const handleDeleteSuccess = (data) => {
        toast(data.message || "User deleted successfully")
        setCurrentUser(null)
        navigate("/home")
    }

    const handleDeleteError = (data) => {
        toast(data.message || "Error deleting user")
    }

    const handlePromote = () => {
        put(
            `user/${id}`,
            true,
            { status: "SysAdmin" },
            handlePromoteSuccess,
            handlePromoteError
        )
    }

    const handlePromoteSuccess = (data) => {
        toast("User promoted to SysAdmin!")
        setCurrentUser({ ...currentUser, status: "SysAdmin" })
    }

    const handlePromoteError = (err) => {
        toast(err.message || "Error promoting user")
    }

    if (isLoading || !currentUser) {
        return <Spinner animation="grow" className="m-5" />
    }

    const productsRendered = () => {
        if (!currentUser.products || currentUser.products.length === 0)
            return <p>No products found :(</p>

        return currentUser.products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))
    }

    const purchasesRendered = () => {
        if (user.status !== "SysAdmin") return null
        if (!currentUser.purchases || currentUser.purchases.length === 0)
            return <p>No purchases found :(</p>

        return currentUser.purchases.map((purchase,i) => (
            <Card key={i} className="m-4 p-3 shadow-sm">
                <h5>Purchase #{i+1}</h5>
                {purchase.products.map((p) => (
                    <Container key={p.id}>
                        <h6>{p.name}</h6>
                        <p>Quantity: {p.productPurchase.quantity}</p>
                        <p>Subtotal: {p.productPurchase.subtotal}</p>
                    </Container>
                ))}
                <h6>Total: {purchase.total}</h6>
            </Card>
        ))
    }

    return (
        <Layout>
            <Container>
                <Row className="align-items-center mb-4">
                    <Col>
                        <h1>{currentUser.username}</h1>
                        <h5>{currentUser.email}</h5>
                        <h6>Status: {currentUser.status}</h6>
                    </Col>

                    {user.status === "SysAdmin" && (
                        <Col sm="auto" className="text-end">
                            {currentUser.status !== "SysAdmin" && (
                                <Button
                                    variant="warning"
                                    className="me-3"
                                    onClick={handlePromote}
                                >
                                    Promote to SysAdmin
                                </Button>
                            )}
                            <Button variant="danger" onClick={handleDeleteUser}>
                                Delete User
                            </Button>
                        </Col>
                    )}
                </Row>

                <Row className="mt-4">
                    <h4>Products published</h4>
                </Row>
                <Row>{productsRendered()}</Row>

                {user.status === "SysAdmin" && (
                    <>
                        <Row className="mt-5">
                            <h4>Purchases</h4>
                        </Row>
                        <Row>{purchasesRendered()}</Row>
                    </>
                )}
            </Container>
        </Layout>
    )
}

export default UserPage
