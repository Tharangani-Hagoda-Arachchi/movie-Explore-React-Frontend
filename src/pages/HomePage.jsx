import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage = ({ darkMode, setDarkMode }) => {
    return (
        <div>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <Footer />

        </div>
    )
}

export default HomePage
