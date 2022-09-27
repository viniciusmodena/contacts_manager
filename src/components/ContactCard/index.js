import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useContact } from "../../Providers/contacts";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useModal } from "../../Providers/modals";

function ContactCard({ item }) {
  const { setContact } = useContact();
  const { handleOpenModal } = useModal();
  return (
    <ListItem
      sx={{
        p: 0,
        borderBottom: 2,
        borderColor: "lightgrey",
      }}
    >
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={12}>
          <Typography>{item.full_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ bgcolor: "whitesmoke" }}>
          <List>
            <ListItem>Email: {item.email}</ListItem>
            <ListItem>Phone: {item.phone_number}</ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            bgcolor: "whitesmoke",
          }}
        >
          <IconButton
            edge="end"
            aria-label="edit contact "
            sx={{ m: 1, bgcolor: "blue" }}
            onClick={() => {
              setContact(item);
              handleOpenModal("update");
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="remove contact "
            sx={{ mx: 1, bgcolor: "red" }}
            onClick={() => {
              setContact(item);
              handleOpenModal("delete");
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default ContactCard;
