import {Link} from 'react-router-dom'
import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
  return (
    <NextMatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videoitemBackground = isDarkTheme ? 'darkVideo' : 'lightVideo'
        const videoText = isDarkTheme ? 'darkText' : 'lightText'

        return (
          <Link to={`/videos/${id}`}>
            <div className={videoitemBackground}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img"
              />
              <div className="channellogo-details-container">
                <img
                  src={channel.profile_image_url}
                  alt="channel logo"
                  className="logo-img"
                />
                <div className="details-container">
                  <p className={videoText}>{title}</p>
                  <p className={videoText}>{channel.name}</p>
                  <div className="views-date-container">
                    <p className={videoText}>{viewCount} views </p>
                    <p className={videoText}>{publishedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </NextMatchContext.Consumer>
  )
}

export default VideoItem
