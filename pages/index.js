import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Home({ products }) {
  const pageSize = 10;
  const [productsSearch, setproductsSearch] = useState(products);
  const [productsPagination, setproductsPagination] = useState(products);
  const [search, setsearch] = useState('');
  const [page, setpage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    setsearch(e.target.value);
    setpage(1);
  };

  const handlePagination = (index) => {
    setpage(index);
  };

  useEffect(() => {
    let filtered = products;
    if (search && search !== '') {
      filtered = products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    }
    setproductsSearch(filtered);
  }, [search, products]);

  useEffect(() => {
    let filtered = productsSearch;
    if (page) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      filtered = filtered.slice(
        start,
        end <= productsSearch.length ? end : productsSearch.length
      );
    }
    setproductsPagination(filtered);
  }, [page, productsSearch]);

  return (
    <div className="container">
      <div className="main listpage">
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="pagination">
          {new Array(Math.ceil(productsSearch.length / pageSize))
            .fill('')
            .map((el, index) => (
              <button
                className={`pagination__page ${
                  page == index + 1 && 'pagination__page--active'
                }`}
                key={index}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </button>
            ))}
        </div>
        <div className="products">
          {productsPagination.map((product) => (
            <div className="product" key={product.id}>
              <div className="product__image">
                <Image
                  src={product.image.src}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="product__title">{product.title}</div>
              <div className="product__price">{product.variants[0].price}</div>
              <Link href={`/product/${encodeURIComponent(product.id)}`}>
                <a className="product__link">Go to detail</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.API, {
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': process.env.TOKEN,
    },
  });
  const data = await res.json();
  return {
    props: {
      products: data.products,
    },
  };
}

export default Home;
