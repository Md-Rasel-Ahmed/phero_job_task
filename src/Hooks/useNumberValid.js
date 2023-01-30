import React from "react";

export default function useNumberValid(number) {
  let regex = "/^(?:+88|88)?(01[3-9]d{8})$/";
  if (!number.match(regex)) {
    return alert("Number is not valid");
  }
}
