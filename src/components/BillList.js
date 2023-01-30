import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import Modals from "./Modals";
import BillHeader from "./BillHeader";
import Loader from "./Loader";
import Header from "./Header";

export default function BillList() {
  const [billLists, setBillLists] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [editabledata, setEditabledata] = useState();
  const [success, setIsSucess] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000?page=${currentPage}&size=10`)
      .then((res) => res.json())
      .then((data) => {
        setBillLists(data);
        setIsLoading(false);
      });
    fetch("http://localhost:9000/billCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        if (count > 10) {
          const pages = Math.ceil(count / 10);
          setPageCount(pages);
        }
        setIsLoading(false);
      });
  }, [success, currentPage, pageCount]);
  // handle Edit bill
  const handleEditBill = (bill) => {
    setEditabledata(bill);
    setModalShow(true);
  };
  // handle delete bill
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:9000/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire("Deleted!", "Student has been deleted.", "success");
            const remeningStudents = billLists.filter((b) => b.id !== id);
            setBillLists(remeningStudents);
            setIsSucess(!success);
          });
      }
    });
  };

  // find bill by the search text
  const findBill = () => {
    if (searchText.length > 0) {
      let find = billLists?.filter(
        (text) =>
          text.name.match(searchText) ||
          text.email.match(searchText) ||
          text.phone.match(searchText)
      );
      setBillLists(find);
    } else alert("Something was error");
  };
  const totalPaidAmount = billLists?.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.amount),
    0
  );

  return (
    <>
      <Header totalPaidAmount={totalPaidAmount} />
      <div className="p-5">
        {/* bill header start */}

        <div className="d-flex gap-2 mb-2 ">
          <BillHeader
            totalPaidAmount={totalPaidAmount}
            setIsSucess={setIsSucess}
            success={success}
          />
          <div className="d-flex">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              placeholder="Search Bill"
              className="form-control "
              type="text"
            />

            <button onClick={findBill} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
        {/* bill header end */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill Id</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {billLists?.length <= 0 && (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-danger fw-bold ">Not Found</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {billLists?.map((bill) => {
                  return (
                    <tr key={bill._id}>
                      <td className="text-success">{bill._id}</td>
                      <td>{bill.name}</td>
                      <td>{bill.email}</td>
                      <td>{bill.phone}</td>
                      <td>{bill.amount}</td>
                      <td>
                        <svg
                          onClick={() => handleEditBill(bill)}
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
                          onClick={() => handleDelete(bill._id)}
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
            </>
          )}
        </Table>
        <Modals
          setModalShow={setModalShow}
          modalShow={modalShow}
          editabledata={editabledata}
          setIsSucess={setIsSucess}
        />

        {/* Pagination  */}
        {[...Array(pageCount).keys()].map((number) => (
          <Button
            onClick={() => setCurrentPage(number)}
            className={`${
              currentPage == number ? "bg-primary" : "bg-light"
            } m-1  text-dark`}
          >
            {number + 1}
          </Button>
        ))}
      </div>
    </>
  );
}
