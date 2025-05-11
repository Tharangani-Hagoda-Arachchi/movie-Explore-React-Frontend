import React from 'react'
import Header from '../components/Header'
import MovieDetail from '../components/MovieDetail'
import Footer from '../components/Footer'

const MoveiDetailPage = ( {darkMode, setDarkMode }) => {
  return (
    <div>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <MovieDetail/>

            <Footer />

        </div>
  )
}

export default MoveiDetailPage