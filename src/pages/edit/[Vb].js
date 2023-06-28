import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BasicModal from "src/Model/ModelPopup";

function Vb() {
  const router = useRouter();
  const { Vb } = router.query;
  const setChangeVale = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    createdAt: "",
    avatar: "",
    age: "",
    phone: "",
    addressCity: "",
    addressState: "",
    addressCountry: "",
  });
  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = () => {
    axios
      .get(`http://localhost:8000/data/${Vb}`)
      .then((result) => {
        setEditData(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/data/${Vb}`, { ...editData });
    router.push("/customers");
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <div style={{width:"50%"}}>
        <form action="" style={{ display: "flex" ,flexDirection:"column",gap:20}} onSubmit={submitHandler}>
          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="name"
            name="name"
            variant="outlined"
            value={editData.name}
          />
          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="email"
            name="email"
            variant="outlined"
            value={null || editData.email}
          />
          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="createdAt"
            name="createdAt"
            variant="outlined"
            value={null || editData.createdAt}
          />

          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="avatar"
            name="avatar"
            variant="outlined"
            value={null || editData.avatar}
          />

          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="addressCity"
            name="addressCity"
            variant="outlined"
            value={null || editData.addressCity}
          />
          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="addressState"
            name="addressState"
            variant="outlined"
            value={null || editData.addressState}
          />
          <TextField
            onChange={setChangeVale}
            id="outlined-basic"
            label="addressCountry"
            name="addressCountry"
            variant="outlined"
            value={null || editData.addressCountry}
          />
          <input type="submit" value="save" />
        </form>
      </div>
    </div>
  );
}

export default Vb;
