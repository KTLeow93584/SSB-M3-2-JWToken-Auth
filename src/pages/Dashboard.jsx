// ==============================================
import { /*useDispatch,*/ useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
// ==============================================
export default function Dashboard() {
    // ===========================
    //const dispatch = useDispatch();
    let activeUserObj = useSelector((state) => state.activeUser);
    const user = activeUserObj.user;
    // ===========================
    return (
        <Container fluid
            className="d-flex flex-column primary-container m-0 p-0"
            style={{ flex: 1, overflowX: "hidden" }}>
            <Form className="mt-3 mx-3">
                {/* -------------------------- */}
                {/* First Name */}
                <Row className="w-100 mb-3">
                    <Col className="col-12 d-flex align-items-center">
                        <Form.Label htmlFor="first-name"
                            className="text-non-links-primary fw-bold me-2 my-0 py-0">
                            First Name:<span> </span>
                        </Form.Label>
                        <Form.Control id="first-name" disabled value={user.firstName}
                            className="input-bar-no-shadow me-2"
                            type="name" placeholder="First Name" />
                    </Col>
                </Row>
                {/* -------------------------- */}
                {/* Last Name */}
                <Row className="w-100 mb-3">
                    <Col className="col-12 d-flex align-items-center">
                        <Form.Label htmlFor="last-name"
                            className="text-non-links-primary fw-bold me-2 my-0 py-0">
                            Last Name:<span> </span>
                        </Form.Label>
                        <Form.Control id="last-name" disabled value={user.lastName}
                            className="input-bar-no-shadow me-2"
                            type="name" placeholder="Last Name" />
                    </Col>
                </Row>
                {/* -------------------------- */}
            </Form>
        </Container>
    );
}