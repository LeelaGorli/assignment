import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Home from './components/Home'

import VideoDetails from './components/VideoDetails'

import SavedVideos from './components/SavedVideos'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import NextMatchContext from './context/NextMatchContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedList: [], isSave: false}

  changeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addToSave = video => {
    const {savedList} = this.state
    const videoObject = savedList.find(eachVideo => eachVideo.id === video.id)

    if (videoObject) {
      this.setState(prevState => ({
        savedList: prevState.savedList.filter(
          eachVideo => eachVideo.id !== video.id,
        ),
        isSave: !prevState.isSave,
      }))
    } else {
      this.setState(prevState => ({
        savedList: [...prevState.savedList, video],
        isSave: !prevState.isSave,
      }))
    }
  }

  render() {
    const {isDarkTheme, isSave, savedList} = this.state
    console.log(savedList)
    return (
      <NextMatchContext.Provider
        value={{
          isDarkTheme,
          savedList,
          isSave,
          changeTheme: this.changeTheme,
          addToSave: this.addToSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NextMatchContext.Provider>
    )
  }
}

export default App
