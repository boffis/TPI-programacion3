import { useEffect, useState } from "react";
import { Container, Col, Row, Spinner, Dropdown, Pagination, Button } from "react-bootstrap";
import Layout from "../layout/Layout";
import SearchBar from "../shared/searchBar/searchBar";
import useFetch from "../../hooks/useFetch/useFetch";
import ProductCard from "../shared/productCard/ProductCard";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const Store = () => {
    const [search, setSearch] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [filter, setFilter] = useState("Show all");
    const [orderType, setOrderType] = useState("name");
    const [orderDesc, setOrderDesc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // FETCH 

    const { get, isLoading } = useFetch();

    useEffect(() => {
        get("products", false, onFetchSuccess, onFetchError);
        
    }, []);

    const onFetchSuccess = (data) => {
        setAllProducts(data);
    };

    const onFetchError = (data) => {
        console.log("Error al obtener productos:", data);
    };

    // FETCH 

    // HANDLERS

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilter = (selected) => {
        setFilter(selected);
        setCurrentPage(1);
    };

    const handleOrderType = (type) => {
        setOrderType(type);
    };

    const toggleOrderDirection = () => {
        setOrderDesc((prev) => !prev);
    };

    // HANDLERS

    

    const productsPerPage = 6;

    const getFilteredProducts = () => {
        let filtered = allProducts.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "Show all" || p.type === filter;
        return matchesSearch && matchesFilter && !p.deleted && p.stock > 0;
        });

        filtered.sort((a, b) => {
        let valueA = orderType === "price" ? a.price : a.name.toLowerCase();
        let valueB = orderType === "price" ? b.price : b.name.toLowerCase();

        if (valueA < valueB) return orderDesc ? 1 : -1;
        if (valueA > valueB) return orderDesc ? -1 : 1;
        return 0;
        });

        return filtered;
    };

    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const pageProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
        <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
        >
            {i}
        </Pagination.Item>
        );
    }

    //RENDERING

    const types = ["Show all", "Top", "Bottom", "Footwear", "Accessory"];

    const filterButtons = types.map((type) => (
        <Dropdown.Item key={type} onClick={() => handleFilter(type)}>
        {type}
        </Dropdown.Item>
    ));

    const renderedProducts = pageProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
    ));

    const orderIcon = orderDesc ? (
        <FaSortAmountDown onClick={toggleOrderDirection} style={{ cursor: "pointer" }} />
    ) : (
        <FaSortAmountUp onClick={toggleOrderDirection} style={{ cursor: "pointer" }} />
    );

    if (isLoading) {
        return (
        <Layout>
            <Spinner animation="border" />
        </Layout>
        );
    }

    return (
        <Layout>
        <Row className="align-items-center mb-3">
            <Col md={4}>
            <SearchBar
                entity=""
                type=""
                onChange={handleSearch}
                value={search}
            />
            </Col>

            <Col md={3}>
            <h5>Filter:</h5>
            <Dropdown>
                <Dropdown.Toggle>{filter}</Dropdown.Toggle>
                <Dropdown.Menu>{filterButtons}</Dropdown.Menu>
            </Dropdown>
            </Col>

            <Col md={3}>
            <h5>Order:</h5>
            <Dropdown>
                <Dropdown.Toggle>{orderType}</Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOrderType("name")}>Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOrderType("price")}>Price</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Col>

            <Col md={2} className="text-center">
            {orderIcon}
            </Col>
        </Row>

        <Container>
            <Row className="justify-content-center">
            {renderedProducts.length !== 0 ? renderedProducts : <p>No products found</p>}
            </Row>

            <Row className="justify-content-center mt-3">
            <Pagination>{pages}</Pagination>
            </Row>
        </Container>
        </Layout>
    );
};

export default Store;
