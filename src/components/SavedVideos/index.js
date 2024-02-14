import {FaFire} from 'react-icons/fa'

import Header from '../Header'

import SideBar from '../SideBar'

import NextMatchContext from '../../context/NextMatchContext'

import SavedItem from '../SavedItem'

import './index.css'

const SavedVideos = () => (
  <NextMatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedList} = value
      const savedListContainer = isDarkTheme ? 'dark-saved' : 'light-saved'
      const savedHeader = isDarkTheme ? 'dark-header' : 'light-header'
      return (
        <>
          <Header />
          <div className="sidebar-saved-container">
            <SideBar />
            {savedList.length > 0 ? (
              <div data-testid="banner" className="saved">
                <div className={savedHeader}>
                  <FaFire />
                  <h1 className="text">Saved Videos</h1>
                </div>
                <ul data-testid="savedVideos" className={savedListContainer}>
                  {savedList.map(eachSave => (
                    <SavedItem key={eachSave.id} saveDetails={eachSave} />
                  ))}
                </ul>
              </div>
            ) : (
              <div className={savedListContainer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  className="no-saved"
                  alt="no saved videos"
                />
                <h1>No saved videos found</h1>
                <p>Save your videos by clicking a button</p>
              </div>
            )}
          </div>
        </>
      )
    }}
  </NextMatchContext.Consumer>
)

export default SavedVideos
