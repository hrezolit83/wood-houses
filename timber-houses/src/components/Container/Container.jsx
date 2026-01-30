import styles from "./Container.module.css";

export default function Container({ children, as: Tag = "div" }) {
  return <Tag className={styles.container}>{children}</Tag>;
}
