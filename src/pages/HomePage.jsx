import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrendingBanner from '../components/TrendinBanner'

const HomePage = ({ darkMode, setDarkMode }) => {
    return (
        <div>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <TrendingBanner/>

            <Footer />

        </div>
    )
}

export default HomePage
