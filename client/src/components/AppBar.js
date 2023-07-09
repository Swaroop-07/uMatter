import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link as LINK, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/authStore.js";
import Logo from "../assets/images/icon.png";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isauthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    navigate("/login");
    dispatch(logOut());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", borderBottom: "5px solid #d19567" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <LINK className="navButton" to="/">
              <img src={Logo} style={{ width: "15%", height: "35px" }} />
            </LINK>
          </Typography>
          {!isauthenticated && (
            <Button color="inherit">
              <LINK className="navButton" to="/login">
                Login
              </LINK>
            </Button>
          )}
          {isauthenticated && (
            <Button color="inherit" onClick={logout}>
              <LINK
                className="navButton"
                to="/login"
                sx={{ backgroundColor: "#000" }}
              >
                Logout
              </LINK>
            </Button>
          )}
          {!isauthenticated && (
            <Button color="inherit">
              <LINK
                className="navButton"
                to="/register"
                sx={{ backgroundColor: "#000" }}
              >
                Register
              </LINK>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* <hr
        size="5" color="#5C4033"
        noshade /> */}
    </Box>
  );
}
