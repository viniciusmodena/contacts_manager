import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyrights";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/users";

const theme = createTheme();

export default function SignUp() {
  const { userSignUp, authUser, setAuthUser, user, setUser } = useUser();

  const navigate = useNavigate();

  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .required("*This field is required")
      .min(4, "This field must have a minumun of 4 characteres")
      .max(127, "Tihe field must have a maximun of 127 characteres"),
    email: yup.string().email().required("*This field is required"),
    password: yup
      .string()
      .required("*This field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!"
      ),
    confirmPassword: yup
      .string()
      .required("* Required field!")
      .oneOf([yup.ref("password"), null], "*Passwords don't match"),
    phoneNumber: yup
      .string()
      .required("* Required field!")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number format is invalid"
      )
      .min(9, "A phone number must have a least 9 digits")
      .max(15, "Phone numbers can't have more than 15 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = (data) => {
    const user = {
      full_name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phoneNumber,
    };

    userSignUp(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* Sign Up Form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignUp)}
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
              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              {/* Password Confirmation */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoFocus
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* Redirect to SignIn */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
