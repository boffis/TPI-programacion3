import { useEffect, useState } from "react"
import { Container, Col, Row } from "react-bootstrap"
import Layout from "../layout/Layout"
import SearchBar from "../shared/searchBar/searchBar"
import useFetch from "../../hooks/useFetch/useFetch"
import ProductCard from "./productCard/ProductCard"

const Store = () => {
    const [search, setSearch] = useState("")
    const [allProducts, setAllProducts] = useState([])
    const [toRenderProducts, setToRenderProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [direction, setDirection] = useState("down")

    const { get} = useFetch()

    const onChangeSearch= (e)=> {
        setSearch(e.target.value)
    }

    const onFetchSuccess = (data) => {
        setAllProducts(data)
        setToRenderProducts(data)
        console.log("good")
    }

const onFetchError = (data) => {
    setAllProducts(data)
    console.log("bad")
    }

    useEffect(()=>{
        get("products", false, onFetchSuccess, onFetchError )
    }, [])

    const renderedProducts = toRenderProducts.map((e)=>{
        return (
            <ProductCard
            product={e}
            />
        )
    })

    return (
        <Layout>
            <SearchBar
            entity=""
            type=""
            onChange={onChangeSearch}
            value={search}
            />
            {renderedProducts}
        </Layout>
    )
}

export default Store