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
import ConfirmationModal from "../ConfirmationModal";

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

export default function ContactDetailModal({ open, type, handleClose }) {
  const { contact, updateContactInfo, deleteContact } = useContact();

  const updateContactSchema = yup.object().shape({
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
    resolver: yupResolver(updateContactSchema),
  });

  const handleEdit = (data) => {
    const updatedData = {
      full_name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
    };

    updateContactInfo(contact.id, updatedData);
    handleClose();
  };

  const handleDelete = () => {
    deleteContact(contact.id);
    console.log("Deleted");
    handleClose();
  };

  const message = `Do you really want to remove ${contact.full_name} from yor
  contatc list?`;

  switch (type) {
    case "update":
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
              Update Contact Information
            </Typography>
            {/* Update Contact Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(handleEdit)}
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
                    defaultValue={contact.full_name}
                  />
                </Grid>
                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    defaultValue={contact.email}
                  />
                </Grid>
                {/* Phone Number */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phone"
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    defaultValue={contact.phone_number}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    {/* Discard Changes Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: "red" }}
                      onClick={handleClose}
                    >
                      Discard
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    {/* Save Change Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Modal>
      );

    case "delete":
      return (
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          modalMessage={message}
          handleClick={handleDelete}
        />
      );
  }
}
