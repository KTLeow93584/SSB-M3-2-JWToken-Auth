// ==============================================
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// ==============================================
export default function Home() {
    return (
        <Container fluid className="d-flex flex-column primary-container" style={{ flex: 1, overflowX: "hidden" }}>
            <Row className="w-100">
                <Col className="col-12 d-flex flex-column align-items-center">
                    <h2 className="mt-5">Dummy Home Page</h2>
                </Col>
            </Row>
        </Container>
    )
}
// ==============================================
