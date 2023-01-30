import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function BillHeader({ setIsSucess, success }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [amount, setAmount] = useState(" ");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // add new bill
  const handleAddBill = (e) => {
    e.preventDefault();

    let data = {
      name: name,
      email: email,
      phone: phone,
      amount: amount,
    };

    if (phone.length < 10) return alert("Number is not valid");
    fetch("http://localhost:9000/", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSucess(!success);
        setAmount("");
        setEmail("");
        setName("");
        setPhone("");
        setShow(false);
      });
  };
  return (
    <>
      <Button className="btn-sm" variant="primary" onClick={handleShow}>
        Add New Bill
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddBill}>
            <Form.Floating className="mb-3">
              <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Jhon Doe"
              />
              <label htmlFor="">Full Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Jhon Doe"
              />
              <label htmlFor="email">Email</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="number"
                placeholder="Jhon Doe"
              />
              <label htmlFor="phone">Phone</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                type="number"
                placeholder="Jhon Doe"
              />
              <label htmlFor="amount">Payable Amount</label>
            </Form.Floating>
            <Button type="submit" className="w-100 ">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
