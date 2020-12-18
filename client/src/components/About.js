

import logo from '../images/america.jpg'
// import Footer2 from './Footer2'
import './styles/about.css'
import { NavLink } from 'react-router-dom'


function About() {

    return (
        <div className='aboutBodyContainer'>
            <div className='aboutLogoDiv'>
                <NavLink to='/'><img src={logo} className='aboutLogo' alt='American flag' /></NavLink>
            </div>
            <div>
                <p className='aboutContainer'><i><b>REPRESENT</b></i>&nbsp; is a platform designed to connect you with your elected representatives. Using the <a href='https://developers.google.com/civic-information' target="_blank" rel="noopener noreferrer">Google Civic Information API</a> with any U.S. residential address, you have the ability to find and contact the people who represent you at the local, county, state, and federal levels of government.</p>
            </div>
            <div>
                <p className='aboutContainer'>Talking and engaging with your representatives is one of the best ways to effect change in your local community, so reach out to them today with your concerns and <b>let your voice be heard!</b></p>
            </div>
            <div className='footerContainerAbout'>
                <p>© 2020 / / REPRESENT</p>
                <p><NavLink to='/' className='about'>HOME</NavLink></p>
            </div>
        </div>
    )
}


export default About