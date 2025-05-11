import React from 'react'
import Header from '../components/Header'
import SearchResults from '../components/SearchResult'

const Search = ({darkMode, setDarkMode }) => {
  return (
    <div>
         <Header darkMode={darkMode} setDarkMode={setDarkMode} />
         <SearchResults/>

    </div>
  )
}

export default Search