import axios from "axios";
export const  mainData = (allTypesValue,PageValue) => {
    if (allTypesValue === "") {
      axios
        .get(`http://localhost:8000/data?&_page=${PageValue}&_limit=${10}`)
        .then((result) => {
          setData(result.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
    axios
      .get(`http://localhost:8000/data?name=${allTypesValue}&_page=${PageValue}&_limit=${10}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
    } 
  };