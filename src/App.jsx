import './App.scss'

import { Route, Switch, Redirect } from 'react-router-dom'

import Admin from './Pages/Admin/Admin'
import Login from './Pages/Login/Login'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
        <Redirect path="*" to="/" />
      </Switch>
    </div>
  )
}

export default App
