import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { Link as LINK, Navigate, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authStore.js";
import Logo from "../../assets/images/icon.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Link from "@mui/material/Link";
import './NavigationBox.css';
import { useCallback } from "react";
import Bear from "../../assets/images/Avatar/bear.png"
const drawerWidth = 240;

export default function NavigationBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isauthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.user);
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    navigate("/login");
    dispatch(logOut());
  };
  const myBlogs = useCallback(() => {
    navigate("/blog");
  }, [navigate]);
  const myHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Box sx={{ display: "flex",fontFamily: 'Josefin Sans' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(90% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#fff",
            boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img src={Logo} style={{ width: "100%", marginTop:"40%" }} />
        </Toolbar>
        <br />
        <div
          style={{
            width: "80%",
            margin: "10%",
            background: "linear-gradient(to right, #3d84ff, #2da1cb)",
            textAlign: "center",
            borderRadius: "10px",
            height: "60px",
            boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "0px 10px 0px 10px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "5%",
              marginLeft: "8%",
            }}
          >
            <Avatar
              alt="bear"
              sx={{
                backgroundColor: "#2da1cb",
                color: "#fff",
                
              }}
            >
            <img
              alt="S R"
              src={Bear}
              style={{
                backgroundColor: "#2da1cb",
                color: "#fff",
                width:"100%"
                
              }}
            />
            </Avatar>
            <span
              style={{
                fontSize: "16px",
                color: "#fff",
                fontWeight: 500,
                marginTop: "4%",
              }}
            >
              {userDetails.firstName + " " + userDetails.lastName}
            </span>
          </Stack>
        </div>
        <List sx={{ marginLeft: "5%", marginRight: "5%" }}>
          <Link style={{ color: "#191919", textDecoration: "none" }} onClick={myHome}>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={{color: "#2da1cb"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#2da1cb", fontWeight:"800"}} primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link style={{ color: "#191919", textDecoration: "none" }} onClick={myBlogs}>
            <ListItem key={"NewBlog"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon sx={{color: "#2da1cb"}} />
                </ListItemIcon>
                <ListItemText sx={{color: "#2da1cb", fontWeight:"800"}} primary={"Blog"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link style={{ color: "#191919", textDecoration: "none" }}>
            <ListItem key={"NewStory"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TheaterComedyIcon sx={{color: "#2da1cb"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#2da1cb", fontWeight:"800"}} primary={"Story"} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        {isauthenticated && (
          <Button color="inherit" onClick={logout} style={{marginTop:"80%", fontFamily:'Josefin Sans'}}>
            <LINK
              className="navButton"
              to="/login"
              sx={{ backgroundColor: "#000", color:"#2DA1CB", }}
            >
              Logout
            </LINK>
          </Button>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 0.5}}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
