import * as React from "react";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SvgIcon, DateCalander } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import axios from "axios";
import { Field, useFormik, enableReinitialize } from "formik";
import { signUpSchema } from "src/scm";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { Vb } = router.query;
  const initialValues = { name: "", email: "" };
  const [addNewValue, setAddNewValue] = useState([]);

  React.useEffect(() => {
    handleOpen();
    getAllData();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      console.log("addnewvalue", addNewValue);
    }, 7000);
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      setOpen(false);
      axios.put(`http://localhost:8000/data/${Vb}`, values);
      router.push("/customers");
    },
  });

  const getAllData = () => {
    axios
      .get(`http://localhost:8000/data/${Vb}`)
      .then((result) => {
        console.log("main data", result.data);
        setAddNewValue(result.data);
        console.log(addNewValue);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const states = [
    {
      value: "surat",
      label: "Surat",
    },
    {
      value: "ahemedabad",
      label: "Ahemedabad",
    },
    {
      value: "vadodara",
      label: "Vadodara",
    },
    {
      value: "rajkot",
      label: "Rajkot",
    },
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader subheader="Edit the value of data" title="Edit Data" />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="name"
                        name="name"
                        error={errors.name && touched.name !== undefined ? true : false}
                        helperText={touched.name && errors.name}
                        defaultValue={addNewValue.name}
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="email"
                        name="email"
                        error={errors.email && touched.email !== undefined ? true : false}
                        helperText={touched.email && errors.email}
                        defaultValue={addNewValue.email}
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="age"
                        name="age"
                        defaultChecked={addNewValue.age}
                        error={errors.age && touched.age !== undefined ? true : false}
                        helperText={touched.age && errors.age}
                        value={values.age}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="phone"
                        name="phone"
                        error={errors.phone && touched.phone !== undefined ? true : false}
                        helperText={touched.phone && errors.phone}
                        defaultChecked={addNewValue.phon}
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="city"
                        name="addressCity"
                        error={
                          errors.addressCity && touched.addressCity !== undefined ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.addressCity && errors.addressCity}
                        required
                        select
                        SelectProps={{ native: true }}
                        defaultChecked={addNewValue.addressCity}
                        value={values.addressCity}
                      >
                        {states.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="State"
                        name="addressState"
                        error={
                          errors.addressState && touched.addressState !== undefined ? true : false
                        }
                        helperText={touched.addressState && errors.addressState}
                        defaultChecked={addNewValue.addressState}
                        value={values.addressState}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="addressCountry"
                        error={
                          errors.addressCountry && touched.addressCountry !== undefined
                            ? true
                            : false
                        }
                        helperText={touched.addressCountry && errors.addressCountry}
                        defaultChecked={addNewValue.addressCountry}
                        value={values.addressCountry}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        accept="image/png, image/jpeg"
                        name="avatar"
                        error={errors.avatar && touched.avatar !== undefined ? true : false}
                        helperText={touched.avatar && errors.avatar}
                        defaultValue={addNewValue.avatar}
                        value={values.avatar}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="file"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" type="submit">
                  Save details
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
