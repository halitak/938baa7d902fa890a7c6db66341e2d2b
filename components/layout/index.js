import styles from "./style.module.css";
import cn from "classnames";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
