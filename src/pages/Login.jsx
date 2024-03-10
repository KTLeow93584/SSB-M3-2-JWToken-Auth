import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { login } from '../feature/activeUser/activeUserSlice.jsx';
// ==============================================
export default function Login() {
    // ===========================
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // ===========================
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);

    const handlePasswordVisibility = () => {
        const newVisibility = !isPasswordVisible;
        setPasswordVisibility(newVisibility);
    };
    // ===========================
    const startingInputRef = useRef();
    useEffect(() => {
        startingInputRef.current.focus();
    }, []);
    // ===========================
    const onLogin = (username, password, onProcessSuccessfulCallback = null, onProcessFailedCallback = null) => {
        // =======================
        let loggedInUserObj = {
            user: null,
            lastLogActivity: null,
            token: null
        };
        /*
        const userIndex = cachedUsers.findIndex((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
        if (userIndex !== -1) {
            const user = cachedUsers[userIndex];
            const date = new Date();

            loggedInUserObj = {
                user: { email: user.email, firstName: user.firstName, lastName: user.lastName, image: user.image, tasks: user.tasks },
                lastLogActivity: date.toISOString(),
                token: date.toISOString()
            };
        }
        */
        // =======================
        dispatch(login(loggedInUserObj));
        // =======================
        // Debug
        //console.log("On Successfully Logged In", loggedInUserObj);
        // =======================
        if (onProcessSuccessfulCallback)
            onProcessSuccessfulCallback(loggedInUserObj);

        // On Successful Login Process
        if (loggedInUserObj.user !== null) {
            if (onProcessSuccessfulCallback)
                onProcessSuccessfulCallback(loggedInUserObj);
            navigate("/");
        }
        // On Failed Login Process
        else {
            if (onProcessFailedCallback)
                onProcessFailedCallback(true);
        }
        // =======================
    };
    // ===========================
    return (
        <Container fluid>
            <Row>
                <Col className="col-12"
                    style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderRightWidth: "0px" }}>
                    <Form className="mt-4 mb-2" onSubmit={(event) => {
                        event.preventDefault();

                        if (onLogin)
                            onLogin(username, password, null, (state) => setInvalidUser(state));
                    }}>
                        <Card.Body className="mt-5">
                            {/* ----------------------------- */}
                            {/* Username Form */}
                            <Form.Group className="d-flex align-items-center justify-content-start mb-2">
                                <Form.Label htmlFor="username" className="text-dark me-2 py-0 my-0" style={{ width: "300px" }}>Username: </Form.Label>
                                <Form.Control
                                    ref={startingInputRef}
                                    required id="username" value={username} autoComplete="on"
                                    className="text-dark"
                                    type="text" placeholder="Enter username here"
                                    style={{ width: "100%" }}
                                    onChange={(event) => setUsername(event.target.value)} />
                            </Form.Group>
                            {/* ----------------------------- */}
                            {/* Password Form */}
                            <Form.Group className="d-flex align-items-center justify-content-start">
                                <Form.Label htmlFor="password" className="text-dark me-2 py-0 my-0" style={{ width: "300px" }}>Password: </Form.Label>

                                <div className="w-100 d-flex bg-light rounded   ">
                                    <Form.Control
                                        required id="password" value={password} autoComplete="on"
                                        className="text-dark me-1"
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Enter password here"
                                        style={{ width: "100%" }}
                                        onChange={(event) => setPassword(event.target.value)} />

                                    <Button variant="link" onClick={handlePasswordVisibility}>
                                        <i className={`text-dark bi ${isPasswordVisible ? "bi-eye" : "bi-eye-slash"}`}></i>
                                    </Button>
                                </div>
                            </Form.Group>
                            {/* ----------------------------- */}
                            {/* Submit */}
                            <div className="mt-4 d-flex justify-content-center">
                                <Button type="submit" className="button-primary mb-1" style={{ width: "30%" }}>Login</Button>
                            </div>
                            {/* ----------------------------- */}
                            {
                                invalidUser ?
                                    (<Form.Text className="text-danger">Invalid Username/Password Combination</Form.Text>) :
                                    null
                            }
                        </Card.Body>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
// ==============================================