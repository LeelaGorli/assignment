import {Link} from 'react-router-dom'
import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const GamingItem = props => {
  const {gameDetails} = props
  const {id, title, thumbnailUrl, viewCount} = gameDetails
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
              <div className="details-container">
                <p className={videoText}>{title}</p>
                <p className={videoText}>{viewCount} views </p>
              </div>
            </div>
          </Link>
        )
      }}
    </NextMatchContext.Consumer>
  )
}

export default GamingItem
