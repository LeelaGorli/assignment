import {Link} from 'react-router-dom'

import NextMatchContext from '../../context/NextMatchContext'

import './index.css'

const SavedItem = props => {
  const {saveDetails} = props
  const {id} = saveDetails
  return (
    <NextMatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const savedItemContainer = isDarkTheme
          ? 'dark-save-item'
          : 'light-save-item'
        return (
          <Link to={`/videos/${id}`}>
            <div className="saved-container">
              <img
                src={saveDetails.thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img"
              />
              <div className={savedItemContainer}>
                <p className="saved-text">{saveDetails.title}</p>
                <p className="saved-text">{saveDetails.channel.name}</p>
                <p className="saved-text">{saveDetails.viewCount} views .</p>
                <p className="saved-text">{saveDetails.publishedAt}</p>
              </div>
            </div>
          </Link>
        )
      }}
    </NextMatchContext.Consumer>
  )
}

export default SavedItem
