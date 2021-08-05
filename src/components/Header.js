import PropTypes from 'prop-types'
import Button from './button'
import { useLocation } from 'react-router-dom'

const Header = ({ onAdd, title , showAdd }) => {

    const location = useLocation()
    
    return (
        <header className="header">
            <h1>Task tracker {title}</h1>
            {location.pathname === '/' && <Button color={showAdd? "red" : "green"} text={showAdd? "Close" : "Add"}  onClick={onAdd}/>}
        </header>
    )
}

Header.propTypes = {
    title : PropTypes.string.isRequired
}

export default Header
