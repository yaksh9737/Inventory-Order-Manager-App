import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Path } from '../Commen/Path';

const Navbar = ({ setAuth }) => {
    const navigate = useNavigate();

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("token");
        navigate(Path.login);
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={styles.navbar}>
            <div className="container">
                <NavLink to={Path.homescreen} className="navbar-brand" style={styles.brand}>
                    My Tea Store
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={styles.togglerIcon}></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto" style={styles.navList}>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={Path.homescreen} style={styles.navLink} activeStyle={styles.activeLink}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={Path.product} style={styles.navLink} activeStyle={styles.activeLink}>
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={Path.about} style={styles.navLink} activeStyle={styles.activeLink}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={Path.contact} style={styles.navLink} activeStyle={styles.activeLink}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    <div className="buttons text-center">
                        <NavLink to={Path.Orderdetails} className="btn m-2" style={styles.orderButton}>
                            <i className="fa fa-cart-shopping mr-1"></i> Your Order
                        </NavLink>
                        <NavLink to={Path.login} className="btn m-2" style={styles.logoutButton} onClick={logout}>
                            <LogoutIcon style={styles.logoutIcon} /> Log Out
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#1E1E2F', // Dark background
        padding: '0.8em 1.5em',
        borderBottom: '2px solid #333',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    brand: {
        color: '#FFD700', // Gold color for brand
        fontWeight: 'bold',
        fontSize: '1.5em',
        textDecoration: 'none',
    },
    togglerIcon: {
        color: '#FFF',
    },
    navList: {
        display: 'flex',
        gap: '1.5em',
        fontWeight: 'bold',
        fontSize: '1.1em',
    },
    navLink: {
        color: '#DDD',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    },
    activeLink: {
        color: '#FFD700', // Gold active link
    },
    orderButton: {
        borderColor: '#1E90FF', // DodgerBlue border
        color: '#1E90FF',
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
    },
    logoutButton: {
        borderColor: '#FF073A', // Neon Red border
        color: '#FF073A',
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
    },
    logoutIcon: {
        verticalAlign: 'middle',
        marginRight: '0.3em',
    },
    navLinkHover: {
        '&:hover': {
            color: '#1E90FF', // Highlight on hover
        },
    },
};

export default Navbar;
