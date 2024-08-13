import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

export default function Navbar(props) {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        // Google Analytics
    }, [location]);

    const logout = ()=>{
        navigate("/");
        localStorage.setItem('token', " ");
    }

    return (
        <div className='py-1 mx-3 border rounded'style={{backgroundColor : '#E2DAD6'}}>
            <nav className={`navbar navbar-expand-lg bg-body-tertiary navbar  `} style={{backgroundColor : '#E2DAD6', padding: 0}} data-bs-theme={props.mode} >
                <div className="container-fluid"style={{backgroundColor : '#E2DAD6'}}>


                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/") ? "acitve" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/profile") ? "acitve" : ""}`} to="/profile">Profile</Link>
                            </li>


                        </ul>
                        <h2 style={{fontStyle: 'normal', fontFamily: 'cursive'}}>iNotes</h2>
                        <div className="form-check form-switch">
                            {/* <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" /> */}
                            <button type="button" className="ms-2 btn btn-default btn-sm border rounded" onClick={logout}>
                                <span className="glyphicon glyphicon-log-out"></span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg> Log out
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}
Navbar.propTypes = {
    mode: PropTypes.string,
    toggleMode: PropTypes.func

}
