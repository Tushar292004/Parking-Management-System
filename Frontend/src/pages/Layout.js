import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { clearUser } from "../reducers/userReducer";
import {Instagram, Github, Linkedin, Mail} from "lucide-react";
import '../css/layout.scss';

const Layout = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    };

    useEffect(() => {
        console.log('user ', user);
        if (!user && location.pathname !== '/' && location.pathname !== '/about') {
            navigate('/login')
        }
    }, [user, location])

    return (
        <div className="main-container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">SwiftPark</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/parking'>Parking</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/space'>Spaces</Link>
                            </li>
                            {user?.type !== "seeker" &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/parkingForm'>Create Parking</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/spaceForm'>Create Space</Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to='/booking'>Bookings</Link>
                            </li>
                            {user?.type === "admin" &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/users'>Users</Link>
                                    </li>
                                </>
                            }
                            {user ?
                                <>
                                    <li className="nav-item ms-2">
                                        <Link className="nav-link" to='/profile'><div className="bg-dark px-3 py-2 pointer">{user?.name && user?.name[0]}</div></Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-info " onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                                :
                                <li className="nav-item ms-4">
                                    <Link className="btn btn-outline-info " to='/login'>Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="container-fluid  mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <p>Copyright &copy; 2024 by Tushar Chandak</p>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <a href="https://www.instagram.com/tusharchandak29/profilecard/?igsh=dHU4Ymtpdm4xcm03" className="hover:text-blue">
                        <Instagram />
                        </a>
                        <a href="https://github.com/Tushar292004">
                        <Github />
                        </a>
                        <a href="https://www.linkedin.com/in/tushar-chandak-b2b943257/">
                        <Linkedin />
                        </a>
                        <a href="mailto:tusharchandak2004@gmail.com">
                        <Mail />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Layout;