import { useEffect, useState } from "react";

export default function useLoadedAllBill() {
  const [billLists, setBillLists] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/")
      .then((res) => res.json())
      .then((data) => {
        setBillLists(data);
      });
  }, []);
  return billLists;
}
