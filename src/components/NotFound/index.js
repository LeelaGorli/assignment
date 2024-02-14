import Header from '../Header'

import SideBar from '../SideBar'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const NotFound = () => (
  <NextMatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const homeBackground = isDarkTheme ? 'dark-home' : 'light-home'
      const failureText = isDarkTheme ? 'darkFailure' : 'lightFailure'
      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Header />
          <div className="sidebar-home-container">
            <SideBar />
            <div className={homeBackground}>
              <img src={imgUrl} alt="not found" />
              <h1 className={failureText}>Page Not Found</h1>
              <p className={failureText}>
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </>
      )
    }}
  </NextMatchContext.Consumer>
)

export default NotFound
