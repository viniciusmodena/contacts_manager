import {
  Button,
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
import ProfileField from "../../components/ProfileField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Copyright from "../../components/Copyrights";
import ConfirmationModal from "../../components/ConfirmationModal";

const mdTheme = createTheme();

function Profile() {
  const user = JSON.parse(localStorage.getItem("@contacts_manager:user"));

  const [editProfile, setEditProfile] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const { logout, userUpdateAccountInfo, userDeleteAccount } = useUser();
  const handleClose = () => {
    setOpenConfirmationModal(!openConfirmationModal);
  };

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const updateUserSchema = yup.object().shape({
    name: yup
      .string()
      .required("*This field is required")
      .min(4, "This field must have a minumun of 4 characteres")
      .max(127, "Tihe field must have a maximun of 127 characteres"),
    email: yup.string().email().required("*This field is required"),
    phone: yup
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
      phone_number: data.phone,
    };

    userUpdateAccountInfo(updatedData);
    setEditProfile(false);
  };

  const handleDelete = () => {
    userDeleteAccount();
    logout();
    setEditProfile(false);
  };

  const message = "Are you sure you want to delete your account?";

  return (
    <ThemeProvider theme={mdTheme}>
      <ConfirmationModal
        open={openConfirmationModal}
        handleClose={handleClose}
        modalMessage={message}
        handleClick={handleDelete}
      />
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    p: 2,
                    mt: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>Profile</Typography>
                  {!editProfile && (
                    <Button onClick={toggleEditProfile}>
                      <EditOutlinedIcon />
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="form"
                    onSubmit={handleSubmit(handleEdit)}
                    sx={{ p: 2 }}
                  >
                    <Grid container spacing={2}>
                      {/* Name */}
                      <Grid item xs={12}>
                        <ProfileField
                          editProfile={editProfile}
                          fieldName={"Name"}
                          fieldValue={user.full_name}
                          register={register}
                          error={errors.name}
                        />
                      </Grid>
                      {/* Email */}
                      <Grid item xs={12}>
                        <ProfileField
                          editProfile={editProfile}
                          fieldName={"Email"}
                          fieldValue={user.email}
                          register={register}
                          error={errors.email}
                        />
                      </Grid>
                      {/* Phone Number */}
                      <Grid item xs={12}>
                        <ProfileField
                          editProfile={editProfile}
                          fieldName={"Phone"}
                          fieldValue={user.phone_number}
                          register={register}
                          error={errors.email}
                        />
                      </Grid>
                      {editProfile && (
                        <Grid container>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
                              onClick={toggleEditProfile}
                            >
                              Discard
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
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
                      )}
                      <Grid item xs={12} sx={{ mt: 10 }}>
                        <Button onClick={handleClose}>Delete Account</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Container>
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
