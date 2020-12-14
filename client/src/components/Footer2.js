import './styles/footer.css'
import { NavLink } from 'react-router-dom'

function Footer2() {

    return (
        <div className='footerContainer'>
            <p>© 2020 / / REPRESENT</p>
            <p><NavLink to='/' className='about'>HOME</NavLink></p>
        </div>
    )
}

export default Footer2