import styles from "./header.module.scss"

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        TanStack Query
        <span className={styles.header__logo__sub}>(React Query)</span>
      </h1>
    </header>
  )
}

export default Header
