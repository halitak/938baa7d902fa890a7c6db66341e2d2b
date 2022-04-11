import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

const Product = ({ product }) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__image}>
        <Image
          src={product.image.src}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.product__title}>{product.title}</div>
      <div className={styles.product__price}>{product.variants[0].price}</div>
      <Link
        href={`/product/${encodeURIComponent(
          `${product.id}-${product.handle}`
        )}`}
      >
        <a className={styles.product__link}>Go to detail</a>
      </Link>
    </div>
  );
};

export default Product;
