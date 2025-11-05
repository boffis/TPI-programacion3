import { Container, Row, Col, Carousel,Image } from 'react-bootstrap'
import Layout from '../layout/Layout'

const Home = () => {
  return (
    <Layout>
      <Row className='justify-content-center'>

      <Image
      src='https://images.unsplash.com/photo-1570857502809-08184874388e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym91dGlxdWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500https://images.unsplash.com/photo-1630905119003-329447458f85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvdXRpcXVlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500'
      style={{width:"70vw", height:"auto"}}
      >
      </Image>
        </Row>
    </Layout>
  )
}

export default Home