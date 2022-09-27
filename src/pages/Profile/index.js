import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import Header from "../../components/Header";
import { useUser } from "../../Providers/users";

const mdTheme = createTheme();

function Profile() {
  const { user } = useUser();
  const [editProfile, setEditProfile] = useState(false);

  const updateUserSchema = yup.object().shape({
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
    resolver: yupResolver(updateUserSchema),
  });

  const handleEdit = (data) => {
    const updatedData = {
      full_name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
    };

    // updateContactInfo(updatedData);
    setEditProfile(false);
  };

  const handleDelete = () => {
    // deleteContact();
    setEditProfile(false);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="md" sx={{ my: 5 }}>
            <Paper
              sx={{
                px: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ my: 2, fontWeight: 500 }}>
                    Profile
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="form"
                    noValidate
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
                          defaultValue={user.full_name}
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
                          defaultValue={user.email}
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
                          defaultValue={user.phone_number}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
