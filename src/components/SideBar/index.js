import {Link} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const SideBar = () => (
  <NextMatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const sidebarContainer = isDarkTheme
        ? 'darkSidebar-container'
        : 'lightSidebar-container'
      const textClassforsidebar = isDarkTheme ? 'dark-text' : 'light-text'
      const iconClass = isDarkTheme ? 'dark-icon' : 'light-icon'
      return (
        <div className={sidebarContainer}>
          <ul className="link-container">
            <Link to="/">
              <li className="link-details-container">
                <IoMdHome className={iconClass} />
                <p className={textClassforsidebar}>Home</p>
              </li>
            </Link>
            <Link to="/trending">
              <li className="link-details-container">
                <FaFire className={iconClass} />
                <p className={textClassforsidebar}>Trending</p>
              </li>
            </Link>
            <Link to="/gaming">
              <li className="link-details-container">
                <SiYoutubegaming className={iconClass} />
                <p className={textClassforsidebar}>Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos">
              <li className="link-details-container">
                <SiYoutubegaming className={iconClass} />
                <p className={textClassforsidebar}>Saved Videos</p>
              </li>
            </Link>
          </ul>
          <div className="icons-details-container">
            <p className={textClassforsidebar}>CONTACT US</p>
            <div className="icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="app-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="app-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="app-logo"
              />
            </div>
            <p className={textClassforsidebar}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </NextMatchContext.Consumer>
)

export default SideBar
