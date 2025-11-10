import { Container, Row, Col, Carousel, Image } from 'react-bootstrap'
import Layout from '../layout/Layout'

const Home = () => {
  return (
    <Layout>
      <Row className="justify-content-center align-items-center p-5 text-center">
        <Col xs="auto">
          <h1>Join our community!</h1>
        </Col>
      </Row>
      <Row>
        <Carousel className='mb-2'>
          <Carousel.Item>
            <Image src='https://cdn.shopify.com/s/files/1/0229/0839/articles/image10_c6be8c7e-3708-4a9f-8f17-ecd6d32a5063.jpg?v=1739781671' 
            fluid
            style={{ width: "100%", height: "600px", objectFit: "cover", objectPosition: "center" }}/>
        <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
          <h3>Open all day, every day!</h3>
          <p>Help yourself to any of the items published atany time of the day.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <Image
        src='https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'
        fluid
        style={{ width: "100%", height: "600px", objectFit: "cover", objectPosition: "center" }}/>  
        <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
          <h3>Variety</h3>
          <p>
            Buy all kinds of clothes and accessories!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image 
        src='https://www.adlatina.com/uploads/img/220812053852_zara-adlatina.jpg'
        fluid
        style={{ width: "100%", height: "600px", objectFit: "cover", objectPosition: "center" }}/>
        <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
          <h3>Buy from big labels</h3>
          <p>At some point they will make an account i think.</p>
        </Carousel.Caption>
      </Carousel.Item>
        </Carousel>
      </Row>
    </Layout>
  )
}

export default Home