

import logo from '../images/america.jpg'
import Footer2 from './Footer2'
import './styles/about.css'


function About() {

    return (

        <div className='aboutContainer'>
            <img src={logo} className='aboutLogo' alt='American flag'/>
            <div>This is the about page</div>
            <Footer2 />
        </div>
    )
}


export default About