import { NavLink } from "react-router-dom"
import styles from "./header.module.scss"

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        TanStack Query
        <span className={styles.header__logo__sub}>(React Query)</span>
      </h1>
      <nav className={styles.header__nav}>
        <NavLink
          to="/delay"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          딜레이
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          유저
        </NavLink>
        <NavLink
          to="/user2"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          유저2
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          영화
        </NavLink>
        <NavLink
          to="/movies2"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          영화2
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
