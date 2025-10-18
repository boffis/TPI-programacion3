import { useEffect, useState } from "react"
import { Container, Col, Row } from "react-bootstrap"
import Layout from "../layout/Layout"

const Store = () => {

    const [allItems, setAllItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [renderedItems, setRenderedItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [direction, setDirection] = useState("down")

   

    return (
        <Layout>
            <Container>

            </Container>
        </Layout>
    )
}

export default Store