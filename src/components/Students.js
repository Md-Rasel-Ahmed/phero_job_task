import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import ImportData from "./ImportData";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clickId, setClickId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!editModalShow) return setIsEdit(false);
  }, [editModalShow]);

  const emailValidedReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // add student event handler
  const handleAddStudent = (e) => {
    e.preventDefault();

    if (name && email) {
      if (email.match(emailValidedReg)) {
        const student = {
          name,
          email,
          id: Math.random(),
          timestamp: Date.now(),
        };
        setStudents([...students, student]);
        setName("");
        setEmail("");
      } else {
        return alert("Email is not valid");
      }
    } else {
      return alert("Name and email must be provided");
    }
  };

  // handle Edit Student
  const handleEditStudent = (e) => {
    e.preventDefault();
    if (name && email) {
      const editStudents = students.map((s) =>
        s.id == clickId ? { ...s, name: name, email: email } : s
      );
      setStudents(editStudents);
      setEditModalShow(false);
      setIsEdit(false);
      setName("");
      setEmail("");
    } else {
      return alert("Name and email are required");
    }
  };

  // handle delete student
  const handleDelete = (id) => {
    const remeningStudents = students.filter((s) => s.id !== id);
    setStudents(remeningStudents);
  };

  // Edit modal open
  const editModalOpen = (student) => {
    setIsEdit(true);
    setEditModalShow(true);
    setName(student.name);
    setEmail(student.email);
    setClickId(student.id);
  };

  // handle modal closed
  const handleModalClose = () =>
    isEdit ? setEditModalShow(false) : setModalShow(false);
  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Student Management</h1>
        <Button
          className="btn-sm"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Add Student
        </Button>

        {/* Modal for add and edit  student */}
        <Modal
          show={isEdit ? editModalShow : modalShow}
          onHide={handleModalClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? "Edit Student" : "Add Student"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                placeholder="Student Name"
                className="mb-4"
              />
              <Form.Control
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Student email"
                className="mb-4"
              />

              <Form.Control name="file" type="file" className="mb-4" />

              <Button
                onClick={isEdit ? handleEditStudent : handleAddStudent}
                className="btn btn-primary "
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {/* modal end */}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
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
                <td className="text-success">
                  {moment(student.timestamp).fromNow()}
                </td>
                <td>
                  <img
                    src="https://scontent.fmle1-1.fna.fbcdn.net/v/t39.30808-6/313899730_1184357072156420_256919317010416902_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEXl4dzE0TF69lc9jejtHHfT3IJWTo7BzZPcglZOjsHNkkKi8JmPcVd5IwPip9icGCEFdVAbZwKCdae7gcfqIHg&_nc_ohc=Ne9FDSvviTMAX95jqXT&_nc_ht=scontent.fmle1-1.fna&oh=00_AfDXxi0c-iRyDFf_Sof16kkKbxEuOwld0OOohRCBEOixxw&oe=6383D0DB"
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
                    onClick={() => editModalOpen(student)}
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
      <ImportData students={students} />
    </div>
  );
}
