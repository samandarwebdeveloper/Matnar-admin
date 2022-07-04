import "./Admin.scss"
import { Route, Switch, Redirect } from "react-router-dom"
import { useEffect } from "react"

import { useLogin } from "../../Contexts/Auth"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Category from "../../Components/Category/Category"
import SubCategory from "../../Components/SubCategory/SubCategory"
import Brand from "../../Components/Brand/Brand"


function Admin() {
  const [ token ] = useLogin()

  if (!token) {
    return <Redirect to="/login" />
  }

  useEffect(() => {
      if(!localStorage.getItem('token') && token){
          localStorage.setItem('token', token)
      }
  }, [token])

  return (
    <div className="Admin">
      <Sidebar />
      <div className="Content">
        <Switch>
          <Route path="/category" component={Category} />
          <Route path="/sub-category" component={SubCategory} />
          <Route path="/brand" component={Brand} />
        </Switch>
      </div>
    </div>
  )
}



export default Admin