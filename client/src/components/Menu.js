import { NavLink } from 'react-router-dom'
import './styles/menu.css'

function Menu() {

    return (
        <div className='container'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>

        </div>
    )
}


export default Menu