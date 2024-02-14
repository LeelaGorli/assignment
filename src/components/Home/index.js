import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {IoMdClose, IoMdSearch} from 'react-icons/io'

import Header from '../Header'

import SideBar from '../SideBar'

import VideoItem from '../VideoItem'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homeVideosList: [],
    searchInput: '',
    displayBanner: true,
  }

  componentDidMount() {
    this.getHomeDetails()
  }

  closeBanner = () => {
    this.setState({
      displayBanner: false,
    })
  }

  getNewOutput = () => {
    this.getHomeDetails()
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getHomeDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: video.channel,
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        homeVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomeSuccessView = () => {
    const {homeVideosList, searchInput} = this.state
    const showemptyView = homeVideosList.length > 1
    return (
      <NextMatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeBackground = isDarkTheme ? 'dark-home' : 'light-home'
          const failureText = isDarkTheme ? 'darkFailure' : 'lightFailure'
          return (
            <div data-testid="home" className={homeBackground}>
              <div className="searchInputContainer">
                <input
                  type="search"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  className="search"
                />
                <button
                  onClick={this.getNewOutput}
                  className="searchbutton"
                  type="button"
                  data-testid="searchButton"
                >
                  <IoMdSearch />
                </button>
              </div>
              {showemptyView ? (
                <ul className="videolist-container">
                  {homeVideosList.map(eachVideo => (
                    <VideoItem key={eachVideo.id} videoDetails={eachVideo} />
                  ))}
                </ul>
              ) : (
                <div className="no-result-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                    className="empty-img"
                  />
                  <h1 className={failureText}>No Search results found</h1>
                  <p className={failureText}>
                    Try different key words or remove search filter
                  </p>
                  <button
                    type="button"
                    onClick={this.getNewOutput}
                    className="retry-button"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </NextMatchContext.Consumer>
    )
  }

  renderHomeFailureView = () => {
    const {searchInput} = this.state
    return (
      <NextMatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const failureImg = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          const homeBackground = isDarkTheme ? 'dark-home' : 'light-home'
          const failureText = isDarkTheme ? 'darkFailure' : 'lightFailure'

          return (
            <div className={homeBackground}>
              <div className="searchInputContainer">
                <input
                  type="text"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  className="search"
                />
                <button
                  onClick={this.getNewOutput}
                  className="searchbutton"
                  type="button"
                >
                  <IoMdSearch />
                </button>
              </div>
              <div className="failure-container">
                <img
                  src={failureImg}
                  alt="failure view"
                  className="failue-image"
                />
                <h1 className={failureText}>Oops! Something Went Wrong</h1>
                <p className={failureText}>
                  We are having some trouble to complete your request.
                </p>
                <p className={failureText}>Please try again</p>
                <button
                  type="button"
                  onClick={this.getNewOutput}
                  className="retry-button"
                >
                  Retry
                </button>
              </div>
            </div>
          )
        }}
      </NextMatchContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderHomeDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeSuccessView()
      case apiStatusConstants.failure:
        return this.renderHomeFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {displayBanner} = this.state
    return (
      <>
        <Header />
        <div className="sidebar-home-container">
          <SideBar />
          <div data-testid="home" className="home-container">
            {displayBanner ? (
              <div className="banner-container" data-testid="banner">
                <div className="banner-content">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="banner-logo"
                  />
                  <p className="banner-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button className="bannerbutton">GET IT NOW</button>
                </div>
                <button
                  onClick={this.closeBanner}
                  data-testid="close"
                  className="close-button"
                  type="button"
                >
                  <IoMdClose className="close-icon" />
                </button>
              </div>
            ) : null}
            {this.renderHomeDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
