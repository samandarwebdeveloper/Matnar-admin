import "./Sidebar.scss"
import Logo from "../../Assets/image/matnar-logo.png"
import { Link, NavLink } from "react-router-dom"

function Sidebar() {

    const handleClick = () => {
        const list = document.getElementsByClassName("category-list")
        const arrow = document.getElementsByClassName("arrow")
        for (let i = 0; i < list.length; i++) {
            list[i].classList.toggle("active")
            arrow[i].classList.toggle("rotate")
        }
    }


  return (
    <div className="Sidebar">
        <div className="Sidebar-header">
            <Link to="/" className="Sidebar-header-logo-link">
                <img src={Logo} alt="Site logo" />
            </Link>
        </div>
        <div className="Sidebar-body">
            <ul className="Sidebar-list">
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/" exact>Orders</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/product">Products</NavLink>
                </li>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/brand">Brands</NavLink>
                </li>
                <li className="Sidebar-list-item">
                        <NavLink className="Sidebar-list-item-link category-link" activeClassName="Sidebar-list-item-link-active" to="/sub-category"><span>Sub category</span><button onClick={handleClick} className="arrow-btn"><i className="fa-solid fa-angle-down arrow"></i></button></NavLink>
                </li>
                    <ul className="Sidebar-categories-list category-list">
                        <li className="Sidebar-list-item">
                            <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/category">Category</NavLink>
                        </li>
                    </ul>
                <li className="Sidebar-list-item">
                    <NavLink className="Sidebar-list-item-link" activeClassName="Sidebar-list-item-link-active" to="/user">Users</NavLink>
                </li>
            </ul>
        </div>
    </div>
  )
}


export default Sidebar