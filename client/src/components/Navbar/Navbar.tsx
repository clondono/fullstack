import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../../static/images/logo.svg'
import { LoggedInMenu } from './LoggedInMenu'
import styles from './Navbar.module.scss'

function Navbar() {
  type TODOReduxState = any

  const { user } = useSelector((state: TODOReduxState) => state.auth)

  const loggedOut = () => {
    return (
      <div className={styles.rightContainer}>
        <Link to='/login' className={styles.whiteText}>
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.navBarRoot}>
      <div className={styles.leftContainer}>
        <Link to='/' className={styles.logoLink}>
          <img className={styles.logo} alt='Fullstack' src={Logo} />
        </Link>
      </div>
      {!!user ? <LoggedInMenu /> : loggedOut()}
    </div>
  )
}

export { Navbar }
