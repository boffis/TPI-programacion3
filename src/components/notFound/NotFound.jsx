import { Container, Row, Col, Button } from "react-bootstrap"
import Layout from '../layout/Layout'
import { useNavigate } from "react-router"

const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }

  return (
    <Layout>
      <Container fluid className="p-5 text-center">
        <Row>
          <Col>
          <h1>404 - Not Found</h1>
          </Col>
        </Row>
        <Row>
          <Col>
          <Button onClick={handleClick}>Go to home</Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}  

export default NotFound