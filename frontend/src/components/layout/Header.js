import { Link } from "react-router-dom"

const Header = ({children}) => {
  return(
<nav>
  <Link to='/lobby'>
    <img src='img/logo.png' alt="Logo" 
    className="h-20"/>
  </Link>
    {children}
</nav>
  )
}

export default Header