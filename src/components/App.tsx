import React from 'react'
import { Login } from './Login'
import '../styles/MainStyle.css'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history'
import { User, AppState } from '../model/StatesModel'
import { AuthService } from '../services/AuthService'
import { Register } from './Register'
import Menubar from './Menubar'
import Home from './Home/Home'
import Cars from './cars/Cars'

export default class App extends React.Component<{}, AppState> {
  state = {
    showLoginModal: false,
    showRegisterModal: false,
    user: undefined,
  }

  private toggleLoginModel = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal,
      showRegisterModal: false,
    })
  }
  private toggleRegisterModel = () => {
    this.setState({
      showRegisterModal: !this.state.showRegisterModal,
      showLoginModal: false,
    })
  }
  private setUser = (user: User) => {
    this.setState({
      user: user,
    })
    localStorage.setItem('user', JSON.stringify(user))
  }
  private authService: AuthService = new AuthService()

  render() {
    const { showLoginModal, showRegisterModal, user } = this.state
    return (
      <div className="main">
        <Router history={history}>
          <div>
            <Menubar
              user={user}
              login={this.toggleLoginModel}
              signup={this.toggleRegisterModel}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/cars" component={Cars} />
              {/* <Route path="/service" component={Service}> /> */}
            </Switch>
          </div>
        </Router>
        <Login
          close={this.toggleLoginModel}
          show={showLoginModal}
          showRegister={this.toggleRegisterModel}
          authService={this.authService}
          setUser={this.setUser}
        />
        <Register
          close={this.toggleRegisterModel}
          show={showRegisterModal}
          showLogin={this.toggleLoginModel}
          authService={this.authService}
          setUser={this.setUser}
        />
      </div>
    )
  }
}
