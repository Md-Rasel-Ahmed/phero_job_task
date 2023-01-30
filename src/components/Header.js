import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header({ totalPaidAmount }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("isLogedin", JSON.stringify(false));
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-right">
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <Button variant="primary">
              Paid <Badge bg="secondary ">{totalPaidAmount}</Badge>
              <span className="visually-hidden">unread messages</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
