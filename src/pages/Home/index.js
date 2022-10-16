import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "../../components/Copyrights";
import { useContact } from "../../Providers/contacts";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ContactModal from "../../components/ContactsModal";
import { useModal } from "../../Providers/modals";
import ContactDetailModal from "../../components/ContactDetailModal";
import Header from "../../components/Header";
import ContactCard from "../../components/ContactCard";

const mdTheme = createTheme();

function Home() {
  const { type, handleOpenModal, openModal, handleModal } = useModal();
  const { contactList, listUserContacts } = useContact();

  useEffect(() => {
    listUserContacts();
  }, []);

  const user = JSON.parse(localStorage.getItem("@contacts_manager:user"));

  return (
    <ThemeProvider theme={mdTheme}>
      {openModal && type !== "add" ? (
        <ContactDetailModal
          open={openModal}
          type={type}
          handleClose={handleModal}
        />
      ) : (
        <ContactModal open={openModal} handleClose={handleModal} />
      )}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        {/* main */}
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
            <Grid container spacing={2}>
              {/* Contacts List Header */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    px: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ my: 2 }}>
                    {user.first_name} Contacts
                  </Typography>
                  <IconButton
                    edge="start"
                    size="large"
                    aria-label="create new contact "
                    sx={{ my: 2, bgcolor: "limegreen" }}
                    onClick={() => handleOpenModal("add")}
                  >
                    <ControlPointOutlinedIcon />
                  </IconButton>
                </Paper>
              </Grid>
              {/* Contact List */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    px: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    {contactList.map((item, index) => (
                      <ContactCard item={item} key={index} />
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
