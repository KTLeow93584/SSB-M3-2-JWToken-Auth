import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { login } from '../feature/activeUser/activeUserSlice.jsx';
import { callServerAPI, setSessionToken } from '../apis/authApi.jsx';
// ==============================================
export default function Login() {
    // ===========================
    const dispatch = useDispatch();
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
        callServerAPI("login", "POST",
            // JSON Body
            { username: username, password: password },
            // On Successful Callback
            (result) => {
                // Debug
                //console.log("On Successfully Logged In", result);
                // =======================
                if (onProcessSuccessfulCallback)
                    onProcessSuccessfulCallback(result.token);
                // =======================
            },
            // On Failed Callback
            onProcessFailedCallback);
        // =======================
    };
    // ===========================
    return (
        <Container fluid>
            <Row>
                <Col className="col-12" style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderRightWidth: "0px" }}>
                    <Form className="mt-4 mb-2" onSubmit={(event) => {
                        event.preventDefault();

                        onLogin(username, password,
                            (token) => {
                                setSessionToken(token);

                                callServerAPI("profile", "GET",
                                    // JSON Body
                                    null,
                                    // On Successful Callback
                                    (result) => {
                                        // Debug
                                        //console.log("On Successfully GET Profile Page, API", result);

                                        let loggedInUserObj = {
                                            user: { firstName: result.data.firstName, lastName: result.data.lastName },
                                            token: token
                                        };

                                        // Debug
                                        //console.log("On Successfully GET Profile Page, User Obj", loggedInUserObj);
                                        // =======================
                                        dispatch(login(loggedInUserObj));
                                        // =======================
                                    },
                                    // On Failed Callback
                                    null);
                                // =======================
                            }, (error) => {
                                // Debug
                                //console.log("Login Failed. Error:", error);
                                
                                setInvalidUser(true);
                            }
                        );
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
                            <div className="mt-4 d-flex flex-column align-items-center">
                                <Button type="submit" className="button-primary mb-2" style={{ width: "30%" }}>Login</Button>
                                {
                                    invalidUser ?
                                        (<Form.Text className="text-danger fs-6">Invalid Username/Password Combination</Form.Text>) :
                                        null
                                }
                            </div>
                            {/* ----------------------------- */}
                        </Card.Body>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
// ==============================================