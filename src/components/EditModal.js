import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function EditModal({ editShow, handleClose, data, handleEdit }) {
  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  useEffect(() => {}, [data]);
  console.log(data);
  return (
    <Modal show={editShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Student Name"
            className="mb-4"
          />
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Student email"
            className="mb-4"
          />

          <Form.Control type="file" className="mb-4" />

          <Button
            onClick={handleEdit}
            className="btn btn-primary "
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
