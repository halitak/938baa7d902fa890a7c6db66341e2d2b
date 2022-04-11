import styles from "./style.module.css";

const Search = ({ search, handleSearch }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Search"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
