import styles from "./style.module.css";
import cn from "classnames";

const Pagination = ({ productsFiltered, page, pageSize, handlePagination }) => {
  return (
    <div className={styles.pagination}>
      {new Array(Math.ceil(productsFiltered.productsSearch.length / pageSize))
        .fill("")
        .map((el, index) => (
          <button
            className={cn(
              styles.pagination__page,
              page == index + 1 && styles["pagination__page--active"]
            )}
            key={index}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
