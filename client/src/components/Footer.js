import './styles/footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {

    return (
        <div className='footerContainer'>
            <p>© 2024 / / REPRESENT</p>
            <p><NavLink to='/about' className='about'>ABOUT</NavLink></p>
        </div>
    )
}

export default Footer;