import "./Admin.scss"
import { Route } from "react-router-dom"

import Sidebar from "../../Components/Sidebar/Sidebar"
import Category from "../../Components/Category/Category"
import SubCategory from "../../Components/SubCategory/SubCategory"

function Admin() {
  return (
    <div className="Admin">
        <Sidebar />
        <div className="Content">
            <Route path="/category" component={Category} />
            <Route path="/sub-category" component={SubCategory} />
        </div>
    </div>
  )
}


export default Admin