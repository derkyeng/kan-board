import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>KanBoard</h1>
            <div className="links">
                <Link to="/">Home</Link>
            </div>
            <div>
            
            </div>
        </nav>
    );
} 
export default Navbar;