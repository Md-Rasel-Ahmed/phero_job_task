import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Singin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let isLogedin = JSON.parse(localStorage.getItem("isLogedin"));
    if (isLogedin) navigate("/billlist");
  }, [navigate]);

  const handleSingin = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/users")
      .then((res) => res.json())
      .then((data) => {
        let findUser = data.find(
          (user) => user.email === email && user.pass === pass
        );
        if (!findUser) {
          return alert("Something went wrong");
        } else {
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("isLogedin", JSON.stringify(true));
          navigate("/billlist");
        }
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sing in
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSingin}>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="floatingInputCustom"
                          type="email"
                          placeholder="example@e.com"
                        />
                        <label htmlFor="floatingInputCustom">Email</label>
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          required
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          id="floatingInputCustom"
                          type="password"
                          placeholder="123456"
                        />
                        <label htmlFor="floatingInputCustom">Password</label>
                      </Form.Floating>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sing in
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don,t have an account??{" "}
                        <Link to="/singup">Sing UP</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
