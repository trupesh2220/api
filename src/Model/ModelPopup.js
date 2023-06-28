import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SvgIcon, DateCalander } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import axios from "axios";
import { Field, useFormik } from "formik";
import { signUpSchema } from "src/scm";
import { Stack } from "@mui/system";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
// import { signUpSchema } from "src/schemas";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const addValueInArr = (data) => {
  axios.post("http://localhost:8000/data", { ...data });
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [setFiledData, setSetFiledData] = React.useState({
    name: "",
    email: "",
    // avatar: "",
    createdAt: new Date().getFullYear(),
    age: "",
    phone: "",
  });
  const setChangeVale = (e) => {
    setSetFiledData({ ...setFiledData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addValueInArr(setFiledData);
  };

  const initialValues = {
    name: "",
    email: "",
    age: "",
    avatar: null,
    phone: "",
    createdAt: new Date(),
    file: null,
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        setOpen(false);
        addValueInArr(values);
      },
    });

  return (
    <div>
      <Button onClick={handleOpen}>
        <div>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader subheader="The information can be edited" title="Profile" />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name"
                        name="firstName"
                        onChange={handleChange}
                        required
                        value={values.firstName}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        value={values.lastName}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        required
                        value={values.email}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        onChange={handleChange}
                        type="number"
                        value={values.phone}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        required
                        value={values.country}
                      />
                    </Grid>
                    {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained">Save details</Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
