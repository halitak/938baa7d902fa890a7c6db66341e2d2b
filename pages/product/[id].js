import ProductDetail from "../../components/ProductDetail";
import Layout from "../../components/layout";
import fetchProducts from "../../helper/fetch";

function Product({ product }) {
  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await fetchProducts();
  const paths = data.products.map((product) => ({
    params: { id: `${product.id}-${product.handle}` },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await fetchProducts();
  return {
    props: {
      product: data.products.find((item) => item.id == params.id.split("-")[0]),
    },
  };
}

export default Product;
