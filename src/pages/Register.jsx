// ==============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
// ==============================================
export default function Register() {
    // =======================
    const navigate = useNavigate();

    const onRegister = (username, password, firstName, lastName) => {
        // Debug
        //console.log("[Registration] Payload.", action.payload);

        const newUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            tasks: []
        };

        // Debug
        //console.log("[On Register] New User.", newUser);

        //const newUsersBatch = [...cachedUsers, newUser];
        //localStorage.setItem("users", JSON.stringify(newUsersBatch));

        //navigate("/login");
    };
    // =======================
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isPasswordConfirmationVisible, setPasswordConfirmationVisibility] = useState(false);

    const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
    const [doesUserExist, setDoesUserExist] = useState(false);

    const [isCorrectPasswordFormat, setIsCorrectPasswordFormat] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onInputFieldChanged = () => {
        setDoesPasswordMatch(true);
        setDoesUserExist(false);
    }

    const onPasswordVisibilityChanged = () => {
        const newVisibility = !isPasswordVisible;
        setPasswordVisibility(newVisibility);
    };

    const onPasswordConfirmationVisibilityChanged = () => {
        const newVisibility = !isPasswordConfirmationVisible;
        setPasswordConfirmationVisibility(newVisibility);
    };

    function doPasswordsMatch() {
        const match = password === passwordConfirmation;

        setDoesPasswordMatch(match);
        return match;
    }

    function doPasswordsMeetCriteria() {
        const regexUpperLetters = /[A-z]/;
        const regexLowerLetters = /[a-z]/;
        const regexNumbers = /[0-9]/;
        const regexSymbols = /[^a-zA-z0-9]/;

        const pass = password.length >= 8 & regexUpperLetters.test(password) &
            regexLowerLetters.test(password) & regexNumbers.test(password) &
            regexSymbols.test(password);

        setIsCorrectPasswordFormat(pass);

        return pass;
    }

    return (
        <Container fluid>
            <Row>
                <Col className="col-12 secondary-border px-5 mt-5"
                    style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderRightWidth: "0px" }}>
                    <Form className="m-0 p-0" onSubmit={(event) => {
                        event.preventDefault();

                        if (!doPasswordsMatch() || !doPasswordsMeetCriteria())
                            return;

                        onRegister(username, password, firstName, lastName);
                    }}>
                        <Card.Body>
                            <Form.Group className="d-flex flex-column">
                                <Form.Label htmlFor="username" className="text-dark login-text">Register A New Account: </Form.Label>
                                {/* ----------------------------- */}
                                {/* Username Form */}
                                <div className="login-form-border rounded mb-2">
                                    <Form.Control
                                        required id="username" value={username} autoComplete="on"
                                        className="text-dark input-bar-no-shadow"
                                        style={{ width: "30%" }}
                                        type="text" placeholder="Username"
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                            onInputFieldChanged();
                                        }} />
                                </div>
                                {/* User already Exist Error */}
                                {
                                    (doesUserExist) ?
                                        (<Form.Label className="login-text text-danger ms-1 mb-3">{`The user with the username ${username} already exists.`}</Form.Label>) :
                                        null
                                }
                                {/* ----------------------------- */}
                                <hr />
                                {/* ----------------------------- */}
                                {/* Password Form */}
                                <Form.Label htmlFor="password" className="text-dark login-text">Password: </Form.Label>
                                <div className="d-flex secondary-container login-form-border rounded m-0 p-0 mb-2">
                                    <Form.Control
                                        required id="password" value={password} autoComplete="on"
                                        className="text-dark input-bar-no-shadow me-1"
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Password"
                                        style={{ width: "30%" }}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            onInputFieldChanged();
                                        }} />

                                    <Button variant="link" onClick={onPasswordVisibilityChanged}>
                                        <i className={`text-dark bi ${isPasswordVisible ? "bi-eye" : "bi-eye-slash"}`}></i>
                                    </Button>
                                </div>
                                {/* ----------------------------- */}
                                {/* Password Confirmation Form */}
                                {/* Password Form */}
                                <div className="d-flex secondary-container login-form-border rounded m-0 p-0 mb-2">
                                    <Form.Control
                                        required id="password-confirmation" value={passwordConfirmation} autoComplete="on"
                                        className="text-dark input-bar-no-shadow me-1"
                                        type={isPasswordConfirmationVisible ? "text" : "password"}
                                        placeholder="Confirm your Password"
                                        style={{ width: "30%" }}
                                        onChange={(event) => {
                                            setPasswordConfirmation(event.target.value);
                                            onInputFieldChanged();
                                        }} />

                                    <Button variant="link" onClick={onPasswordConfirmationVisibilityChanged}>
                                        <i className={`text-links bi ${isPasswordConfirmationVisible ? "bi-eye" : "bi-eye-slash"}`}></i>
                                    </Button>
                                </div>

                                {/* Mismatched Password Error */}
                                {
                                    (!doesPasswordMatch) ?
                                        (<Form.Label className="text-danger ms-1 mb-3">Both the Password and Password Confirmation fields do not match</Form.Label>) :
                                        null
                                }

                                {/* Password Format */}
                                {
                                    (!isCorrectPasswordFormat) ?
                                        (<Form.Label className="text-danger ms-1 mb-3">{`The current password does not meet the criteria.`}</Form.Label>) :
                                        null
                                }
                                {/* ----------------------------- */}
                                <div className="d-flex flex-column secondary-container primary-border rounded mb-2 px-2 py-1">
                                    <Form.Text className="text-dark login-text fw-bold">Requirements for password: </Form.Text>
                                    <Form.Text className="text-dark login-text">1. 8 characters long. </Form.Text>
                                    <Form.Text className="text-dark login-text">2. Must contain 1 symbol, 1 number, 1 lower and 1 uppercase letter. </Form.Text>
                                </div>
                                {/* ----------------------------- */}
                                <hr className="horizontal-line-text" />
                                {/* ----------------------------- */}
                                {/* First Name + Last Name Forms */}
                                <Form.Label htmlFor="first-name" className="text-dark login-text">Name: </Form.Label>
                                <div className="login-form-border rounded mb-2">
                                    <Form.Control
                                        required id="first-name" value={firstName} autoComplete="on"
                                        className="text-dark input-bar-no-shadow"
                                        style={{ width: "30%" }}
                                        type="name" placeholder="First Name"
                                        onChange={(event) => {
                                            setFirstName(event.target.value);
                                            onInputFieldChanged();
                                        }} />
                                </div>
                                {/* ----------------------------- */}
                                {/* Last Name Form */}
                                <div className="login-form-border rounded mb-2">
                                    <Form.Control
                                        required id="last-name input-bar-no-shadow" value={lastName} autoComplete="on"
                                        className="text-dark"
                                        style={{ width: "30%" }}
                                        type="name" placeholder="Last Name"
                                        onChange={(event) => {
                                            setLastName(event.target.value);
                                            onInputFieldChanged();
                                        }} />
                                </div>
                                {/* ----------------------------- */}
                                <hr />
                                {/* ----------------------------- */}
                                {/* Submit Button */}
                                <Button type="submit" className="button-primary" style={{ width: "30%" }}>Register</Button>
                                {/* ----------------------------- */}
                            </Form.Group>
                        </Card.Body>
                    </Form>
                    {/* ----------------------------- */}
                </Col>
            </Row>
        </Container>
    );
}
// ==============================================