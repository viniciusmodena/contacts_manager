import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useUser } from "../../Providers/users";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ListItemButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Header() {
  const user = JSON.parse(localStorage.getItem("@contacts_manager:user"));
  const { logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            px: "24px",
          }}
        >
          {/* Abre o menu a esquerda */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Contacts Manager
          </Typography>
          <Typography>Welcome {user.first_name}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              width: "100%",
              borderRadius: 0,
              justifyContent: "flex-end",
              px: 2,
              ":hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        {/* lista vertical */}
        <List component="nav">
          {/* listar item aqui */}
          {location.pathname !== "/profile" ? (
            <ListItemButton
              onClick={() => navigate("/profile", { replace: true })}
            >
              <ListItemAvatar>
                <AccountCircleRoundedIcon />
              </ListItemAvatar>
              Profile
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => navigate("/home", { replace: true })}
            >
              <ListItemAvatar>
                <HomeOutlinedIcon />
              </ListItemAvatar>
              Home
            </ListItemButton>
          )}
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={logout}>
            <ListItemAvatar>
              <LogoutOutlinedIcon />
            </ListItemAvatar>
            Logout
          </ListItemButton>
          <Divider sx={{ my: 1 }} />

          {/* listar item aqui */}
        </List>
      </Drawer>
    </>
  );
}

export default Header;
