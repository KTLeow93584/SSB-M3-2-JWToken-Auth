// ==============================================
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { logout } from '../feature/activeUser/activeUserSlice.jsx';
// ==============================================
export default function NavigationPanel() {
    // ===========================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    // ===========================
    const userObj = useSelector((state) => state.activeUser);
    const user = userObj.user;

    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    const handleResize = () => {
        setWindowWidth(document.documentElement.clientWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // ===========================
    return (
        <Container fluid className="bg-info w-100 px-2">
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to={"/"}
                    className="d-flex align-items-center me-auto">
                    <span className="fs-3 fw-bold me-2 text-decoration-none">Simple Mock Auth</span>
                </Navbar.Brand>
                {
                    windowWidth <= 768 ?
                        (
                            <NavigationBarBodyOffCanvas user={user} onLogoutCallback={onLogout} />
                        ) :
                        (
                            <NavigationBarBodyElements user={user} onLogoutCallback={onLogout} />
                        )
                }
            </Navbar>
        </Container>
    );
}
// ==============================================
function NavigationBarBodyElements({ user, onLogoutCallback }) {
    // ===========================
    return (
        <>
            {/* ------------------------------ */}
            {/* Login/Logout Button */}
            {
                user ? (
                    <>
                        <Nav.Link as={Link} to={"/dashboard"}
                            className="text-dark fw-bold me-3">
                            {`${user.firstName} ${user.lastName}`}
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={onLogoutCallback}
                            className="text-dark fw-bold me-2">
                            Logout
                        </Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link as={Link} to={"/login"}
                            className="text-dark fw-bold me-2">
                            Login
                        </Nav.Link>
                    </>
                )
            }
            {/* ------------------------------ */}
            {/* Register Button */}
            {
                user ? null : (
                    <Nav.Link as={Link} to={"/register"}
                        className="text-dark fw-bold">
                        Register
                    </Nav.Link>
                )
            }
            {/* ------------------------------ */}
        </>
    );
}
// ==============================================
function NavigationBarBodyOffCanvas({ user, onLogoutCallback }) {
    // ===========================
    const [showOffCanvasNav, setShowOffCanvasNav] = useState(false);
    const handleClose = () => setShowOffCanvasNav(false);
    // ===========================
    return (
        <>
            {/* ------------------------------ */}
            <Button variant="link" onClick={() => setShowOffCanvasNav(!showOffCanvasNav)}>
                <i className="fs-2 text-dark bi bi-list"></i>
            </Button>
            {/* ------------------------------ */}
            <Offcanvas show={showOffCanvasNav}
                onHide={handleClose}
                responsive="lg"
                className="primary-container"
                placement="end">
                <Offcanvas.Header closeButton className="mt-2 py-0">
                    <Offcanvas.Title className="text-dark">Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <hr className="horizontal-line-text" />
                <Offcanvas.Body>
                    {/* ------------------------------ */}
                    {/* Profile Picture + Login/Logout */}
                    <div className="d-flex align-items-center mb-3">
                        {/* Login/Logout Button */}
                        {
                            user ? (
                                <>
                                    <Nav.Link as={Link} to={"/dashboard"}
                                        className="text-dark fw-bold me-auto">
                                        {`${user.firstName} ${user.lastName}`}
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to={"/login"}
                                        className="text-dark fw-bold me-2">
                                        Login
                                    </Nav.Link>
                                </>
                            )
                        }
                    </div>
                    {
                        user ? (
                            <Nav.Link as={Link} onClick={onLogoutCallback}
                                className="text-dark fw-bold me-auto">
                                Logout
                            </Nav.Link>
                        ) : null
                    }
                    {/* ------------------------------ */}
                    {/* Register Button */}
                    {
                        user ? null : (
                            <Nav.Link as={Link} to={"/register"}>
                                <span className="text-dark fw-bold">Register</span>
                            </Nav.Link>
                        )
                    }
                    {/* ------------------------------ */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
// ==============================================