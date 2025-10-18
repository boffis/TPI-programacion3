import { Card, Container} from "react-bootstrap"
import Layout from "../../layout/Layout"

const authContainer = ({children}) => {
  return (
    <Layout>
      <Container className="m-5 p-5">
        <Card className="p-5">
            <Card.Body>
            {children}
            </Card.Body>
        </Card>
      </Container>
    </Layout>
  )
}   

export default authContainer