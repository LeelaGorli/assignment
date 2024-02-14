import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaFire} from 'react-icons/fa'

import Header from '../Header'

import SideBar from '../SideBar'

import SavedItem from '../SavedItem'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getNewOutput = () => {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/trending'

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
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTrendingSuccesView = () => {
    const {trendingVideosList} = this.state
    return (
      <NextMatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const trendingBackground = isDarkTheme
            ? 'dark-trending'
            : 'light-trending'
          const failureText = isDarkTheme ? 'darkFailure' : 'lightFailure'
          const savedHeader = isDarkTheme ? 'dark-header' : 'light-header'
          return (
            <div>
              <div className={savedHeader}>
                <FaFire />
                <h1 className={failureText}>Trending</h1>
              </div>
              <ul data-testid="trending" className={trendingBackground}>
                {trendingVideosList.map(eachVideo => (
                  <SavedItem key={eachVideo.id} saveDetails={eachVideo} />
                ))}
              </ul>
            </div>
          )
        }}
      </NextMatchContext.Consumer>
    )
  }

  renderTrendingFailureView = () => (
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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderHomeDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingSuccesView()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="sidebar-home-container">
          <SideBar />
          <div data-testid="home" className="home-container">
            {this.renderHomeDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Trending
