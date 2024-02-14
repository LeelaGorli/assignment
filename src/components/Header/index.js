import {Link, withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {IoIosMoon} from 'react-icons/io'

import {IoSunnyOutline} from 'react-icons/io5'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NextMatchContext.Consumer>
      {value => {
        const {isDarkTheme, changeTheme} = value
        const onChangeTheme = () => {
          changeTheme()
        }
        const backgroundClass = isDarkTheme
          ? 'darkHeader-background'
          : 'lightHeader-background'
        const buttonClass = isDarkTheme ? 'dark-button' : 'light-button'
        const logoImg = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <nav className={backgroundClass}>
            <Link to="/">
              <img src={logoImg} className="website-logo" alt="website logo" />
            </Link>
            <div className="last-container">
              <button
                onClick={onChangeTheme}
                type="button"
                data-testid="theme"
                className="theme-button"
              >
                {isDarkTheme ? (
                  <IoSunnyOutline className="themes" />
                ) : (
                  <IoIosMoon className="theme" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-img"
              />
              <Popup
                trigger={
                  <button className={buttonClass} type="button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div>
                    <div>
                      <p>Are you sure, you want to logout?</p>
                    </div>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </NextMatchContext.Consumer>
  )
}

export default withRouter(Header)
