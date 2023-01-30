import React from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Singup() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // handle sing up
  const handleSingup = (e) => {
    e.preventDefault();
    if (pass.length < 5) return alert("Passwords must be at least 6");
    let data = {
      name,
      email,
      pass,
    };
    fetch("http://localhost:9000/users", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
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
                    Sing Up
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSingup}>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          id="floatingInputCustom"
                          type="text"
                          placeholder="Jhon Doe"
                        />
                        <label htmlFor="floatingInputCustom">Full Name</label>
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          value={email}
                          required
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
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?? <Link to="/">Sing In</Link>
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
