import React from 'react'

const NextMatchContext = React.createContext({
  isDarkTheme: false,
  isSave: false,
  savedList: [],
  addToSave: () => {},
  changeTheme: () => {},
})

export default NextMatchContext
