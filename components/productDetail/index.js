import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

const ProductDetail = ({ product }) => {
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
      <div className={styles.product__info}>
        <div className={styles.product__title}>{product.title}</div>
        <div className={styles.product__price}>{product.variants[0].price}</div>
        <div className={styles.product__vendor}>{product.vendor}</div>
        <div className={styles.product__type}>{product.product_type}</div>
        <div className={styles.product__tags}>
          {product.tags.split(", ").map((item) => (
            <span key={item} className={styles.product__tags__item}>
              {item}
            </span>
          ))}
        </div>
        <div
          className={styles.product__content}
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        ></div>
      </div>
    </div>
  );
};

export default ProductDetail;
