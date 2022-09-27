import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Modal, Paper } from "@mui/material";
import { useContact } from "../../Providers/contacts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "whitesmoke",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: [400, 400, 400, 400, 400],
};

export default function ContactModal({ open, handleClose }) {
  const { addNewContact } = useContact();

  const createContactSchema = yup.object().shape({
    name: yup
      .string()
      .required("*This field is required")
      .min(4, "This field must have a minumun of 4 characteres")
      .max(127, "Tihe field must have a maximun of 127 characteres"),
    email: yup.string().email().required("*This field is required"),
    phoneNumber: yup
      .string()
      .required("* Required field!")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number format is invalid"
      )
      .min(9, "A phone number must have a least 9 digits")
      .max(20, "Phone numbers can't have more than 20 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createContactSchema),
  });

  const handleCreate = (data) => {
    const contactData = {
      full_name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
    };
    addNewContact(contactData);
    console.log(data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <CssBaseline /> */}
      <Container sx={style}>
        <Typography component="h1" variant="h5" alignSelf="center">
          Add New Contact
        </Typography>
        {/* Create Contact Form */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleCreate)}
          sx={{ mt: 4 }}
        >
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            {/* Phone Number */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                {/* Cancel Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "red" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={6}>
                {/* Add Contact Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Contact
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Modal>
  );
}
