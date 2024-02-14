import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeShowPassword = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      showSubmitError,
      errorMsg,
    } = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NextMatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const loginMainContainer = isDarkTheme
            ? 'darkMain-container'
            : 'lightMain-container'
          const formContainer = isDarkTheme ? 'dark-from' : 'light-form'
          const labelText = isDarkTheme ? 'dark-letters' : 'light-letters'
          return (
            <div className={loginMainContainer}>
              <form className={formContainer} onSubmit={this.submitForm}>
                {isDarkTheme ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="website-logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="website-logo"
                  />
                )}
                <div className="input-label-container">
                  <label htmlFor="username" className={labelText}>
                    USERNAME
                  </label>
                  <input
                    className="input-container"
                    placeholder="Username"
                    id="username"
                    type="text"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-label-container">
                  <label htmlFor="password" className={labelText}>
                    PASSWORD
                  </label>
                  <input
                    className="input-container"
                    placeholder="Password"
                    id="password"
                    type={passwordType}
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="showpassword"
                    checked={showPassword}
                    onChange={this.onChangeShowPassword}
                  />
                  <label className={labelText} htmlFor="showpassword">
                    Show Password
                  </label>
                </div>
                <button className="login-button" type="submit">
                  Login
                </button>
                {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
              </form>
            </div>
          )
        }}
      </NextMatchContext.Consumer>
    )
  }
}

export default LoginForm
