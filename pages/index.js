import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Product from "../components/product";
import Pagination from "../components/pagination";
import Search from "../components/search";
import Layout from "../components/layout";
import fetchProducts from "../helper/fetch";

function Home({ products }) {
  const pageSize = 10;
  const [productsFiltered, setProductsFiltered] = useState({
    productsSearch: products,
    productsPagination: products,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePagination = (index) => {
    setPage(index);
  };

  useEffect(() => {
    let filtered = products;
    if (search && search !== "") {
      filtered = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setProductsFiltered({ ...productsFiltered, productsSearch: filtered });
  }, [search, productsFiltered, products]);

  useEffect(() => {
    let filtered = productsFiltered.productsSearch;
    if (page) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      filtered = filtered.slice(
        start,
        end <= productsFiltered.productsSearch.length
          ? end
          : productsFiltered.productsSearch.length
      );
    }
    setProductsFiltered({ ...productsFiltered, productsPagination: filtered });
  }, [page, productsFiltered]);

  return (
    <Layout>
      <Search search={search} handleSearch={handleSearch} />
      <Pagination
        productsFiltered={productsFiltered}
        page={page}
        pageSize={pageSize}
        handlePagination={handlePagination}
      />
      <div className={styles.products}>
        {productsFiltered.productsPagination.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await fetchProducts();
  return {
    props: {
      products: data.products,
    },
  };
}

export default Home;
