

import logo from '../images/america.jpg'
import Footer2 from './Footer2'
import './styles/about.css'
import { NavLink } from 'react-router-dom'


function About() {

    return (
        <div>
            <div className='aboutLogoDiv'>
                <NavLink to='/'><img src={logo} className='aboutLogo' alt='American flag' /></NavLink>
            </div>
            <div>
                <p className='aboutContainer'>This is the about page</p>
                <Footer2 />
            </div>
        </div>
    )
}


export default About