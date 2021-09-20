import './App.css';
import Login from './pages/Login'
import Cases from './pages/Cases'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { FC } from 'react'

const PrivateRoute: FC<any> = ({ children, ...rest }) => (
  <Route {...rest} >
      {localStorage.getItem('token') !== null ? children : <Redirect to="/login" />}
  </Route>
)

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                  <Redirect to="/login" />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <PrivateRoute path="/cases" exact>
                  <Cases />
              </PrivateRoute>
          </Switch>
      </BrowserRouter>
  )
}

export default App
