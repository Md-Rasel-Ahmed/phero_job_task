import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function Modals({
  setModalShow,
  modalShow,
  editabledata,
  setIsSucess,
}) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState(" ");
  const [amount, setAmount] = useState(" ");
  const handleClose = () => {
    setShow(false);
    setModalShow(false);
  };
  let email = editabledata?.email;

  // Edit bill
  const handleEditSubmit = (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      phone,
      amount,
    };
    if (phone.length < 10) return alert("Number is not valid");
    fetch(`http://localhost:9000/${editabledata?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSucess(true);
        setName("");
        setPhone("");
        setAmount("");
        setModalShow(false);
      });
  };

  return (
    <>
      <Modal show={modalShow ? true : false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
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
                disabled
                id="email"
                type="email"
                placeholder={editabledata?.email}
              />
              <label htmlFor="email">{editabledata?.email}</label>
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
