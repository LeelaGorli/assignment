import {Component} from 'react'

import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import Loader from 'react-loader-spinner'

import NextMatchContext from '../../context/NextMatchContext'

import Header from '../Header'

import SideBar from '../SideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoItemDetails: {},
    isActiveLike: false,
    isActiveDisLike: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getNewOutput = () => {
    this.getVideoData()
  }

  onActiveLike = () => {
    const {isActiveDisLike} = this.state
    if (isActiveDisLike) {
      this.setState(prevState => ({
        isActiveLike: !prevState.isActiveLike,
        isActiveDisLike: false,
      }))
    } else {
      this.setState(prevState => ({
        isActiveLike: !prevState.isActiveLike,
      }))
    }
  }

  onActiveDislike = () => {
    const {isActiveLike} = this.state
    if (isActiveLike) {
      this.setState(prevState => ({
        isActiveDisLike: !prevState.isActiveDisLike,
        isActiveLike: false,
      }))
    } else {
      this.setState(prevState => ({
        isActiveDisLike: !prevState.isActiveDisLike,
      }))
    }
  }

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const newData = fetchedData.video_details
      const updatedData = {
        id: newData.id,
        title: newData.title,
        videoUrl: newData.video_url,
        thumbnailUrl: newData.thumbnail_url,
        channel: newData.channel,
        viewCount: newData.view_count,
        publishedAt: newData.published_at,
        description: newData.description,
      }
      this.setState({
        videoItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailsSuccesView = () => {
    const {videoItemDetails, isActiveLike, isActiveDisLike} = this.state
    return (
      <NextMatchContext.Consumer>
        {value => {
          const {isDarkTheme, addToSave, isSave} = value
          const detailsContainer = isDarkTheme
            ? 'dark-details'
            : 'light-details'
          const activeClassLike = isActiveLike
            ? 'active-class'
            : 'inactive-class'
          const activeClassDislike = isActiveDisLike
            ? 'active-class'
            : 'inactive-class'
          const activeClassSaved = isSave ? 'active-class' : 'inactive-class'

          const onAddToSave = () => {
            addToSave({...videoItemDetails})
          }

          return (
            <div data-testid="videoItemDetails" className={detailsContainer}>
              <ReactPlayer url={videoItemDetails.videoUrl} />
              <p className="details-text">{videoItemDetails.title}</p>
              <div className="views-like-container">
                <div className="views-container">
                  <p className="details-text">
                    {videoItemDetails.viewCount} views
                  </p>
                  <p className="details-text">{videoItemDetails.publishedAt}</p>
                </div>
                <div className="like-container">
                  <button
                    type="button"
                    onClick={this.onActiveLike}
                    className={activeClassLike}
                  >
                    Like
                  </button>
                  <button
                    onClick={this.onActiveDislike}
                    className={activeClassDislike}
                    type="button"
                  >
                    DisLike
                  </button>
                  <button
                    onClick={onAddToSave}
                    type="button"
                    className={activeClassSaved}
                  >
                    Saved
                  </button>
                </div>
              </div>
              <hr />
              <div className="channel-container">
                <img
                  src={videoItemDetails.channel.profile_image_url}
                  className="channel-img"
                  alt="channel logo"
                />
                <div className="channel-details-container">
                  <p className="details-text">
                    {videoItemDetails.channel.name}
                  </p>
                  <p className="details-text">
                    {videoItemDetails.channel.subscriber_count} subscribers
                  </p>
                  <p className="details-text">{videoItemDetails.description}</p>
                </div>
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

  renderDetailsFailureView = () => (
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
                We are having some trouble to complete your request. Please try
                again.
              </p>
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

  renderVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetailsSuccesView()
      case apiStatusConstants.failure:
        return this.renderDetailsFailureView()
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
        <div className="sidebar-details-container">
          <SideBar />
          <div className="video-details-container">
            {this.renderVideoDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoDetails
