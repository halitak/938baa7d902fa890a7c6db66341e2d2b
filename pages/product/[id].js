import Image from 'next/image';

function Product({ product }) {
  return (
    <div className="container">
      <div className="main detailpage">
        <div className="product">
          <div className="product__image">
            <Image
              src={product.image.src}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="product__info">
            <div className="product__title">{product.title}</div>
            <div className="product__price">{product.variants[0].price}</div>
            <div className="product__vendor">{product.vendor}</div>
            <div className="product__type">{product.product_type}</div>
            <div className="product__tags">
              {product.tags.split(', ').map((item) => (
                <span key={item} className="product__tags__item">
                  {item}
                </span>
              ))}
            </div>
            <div
              className="product__content"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(process.env.API, {
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': process.env.TOKEN,
    },
  });
  const data = await res.json();
  const paths = data.products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.API, {
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': process.env.TOKEN,
    },
  });
  const data = await res.json();
  return {
    props: { product: data.products.find((item) => item.id == params.id) },
  };
}

export default Product;
