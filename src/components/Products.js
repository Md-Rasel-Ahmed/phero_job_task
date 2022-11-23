import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import EditModal from "./EditModal";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editAbleData, setEditAbleData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // add student event
  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = {
      name,
      email,
      id: Math.random(),
    };
    setStudents([...students, student]);
  };

  // handle delete student
  const handleDelete = (id) => {
    const remeningStudents = students.filter((s) => s.id !== id);
    setStudents(remeningStudents);
  };

  // handle Edit student
  const handleEdit = (student) => {
    setIsEdit(true);
    setEditShow(true);
    setEditAbleData(student);
    // console.log(name, email);
    students.map((s) => (s.id === student.id ? { ...s, name: "rasel" } : s));
  };
  const handleClose = () => (isEdit ? setEditShow(false) : setShow(false));

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Student Management</h1>
        <Button
          className="btn-sm"
          variant="primary"
          onClick={() => setShow(true)}
        >
          Add Student
        </Button>
        {/* edit modal  here */}
        {/* <EditModal
          data={editAbleData}
          editShow={editShow}
          handleClose={() => setEditShow(false)}
          // handleEdit={handleEdit({ name, email })}
        /> */}

        {/* Modal for add student */}
        <Modal show={isEdit ? editShow : show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? "Edit Student" : "Add Student"}</Modal.Title>
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
                onClick={handleAddStudent}
                className="btn btn-primary "
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => {
            return (
              <tr key={student.id}>
                <td>1</td>
                <td>
                  <img
                    src="https://i.ibb.co/ZKz2k8R/IMG-3729.jpg"
                    width="40"
                    height="40"
                    className="d-inline-block align-top rounded"
                    alt="React Bootstrap logo"
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <svg
                    onClick={() => handleEdit(student)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-info"
                    // className="w-25 h-25"
                    style={{ width: 20, cursor: "pointer" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  /
                  <svg
                    onClick={() => handleDelete(student.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: 20, cursor: "pointer", color: "red" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
