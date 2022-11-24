import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";

export default function ImportData({ students }) {
  const csvData = [{ name: "rasel", age: "22" }];
  const [arr, setArr] = useState([]);
  //   process csvData
  const process = (str, dilim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");

    const row = str.slice(str.indexOf("\n") + 1).split("\n");
    const newArr = row.map((row) => {
      const value = row.split(",");
      const eachObj = headers.reduce((obj, header, i) => {
        obj[header] = value[i];
        return obj;
      }, {});

      return eachObj;
    });
    setArr(newArr);
  };
  const handleExport = (e) => {
    e.preventDefault();
    let file = e.target.file.files[0];
    if (!file) {
      return alert("error");
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target.result;
      process(text);
    };
    reader.readAsText(file);
  };
  console.log(arr);
  return (
    <>
      {students.length > 0 && (
        <CSVLink data={csvData} filename="Student list" target="_blank">
          <Button>Import students list</Button>
        </CSVLink>
      )}
      <form onSubmit={handleExport}>
        <input type="file" name="file" />
        <Button type="submit">Export Student</Button>
      </form>
    </>
  );
}
