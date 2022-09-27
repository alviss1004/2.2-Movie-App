import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Stack, Link } from "@mui/material";
import MovieSearch from "../components/MovieSearch";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import useAuth from "../hooks/useAuth";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function MainHeader() {
  const { user } = useAuth();
  const auth = useAuth();
  let navigate = useNavigate();
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const defaultValues = {
    genre: [],
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const styleVisible = {
    top: 0,
    position: "fixed",
    transition: "top 0.4s ease-out",
    backgroundColor: "#101010",
  };

  const styleNonVisible = {
    top: "-80px",
    position: "fixed",
    transition: "top 0.4s ease-out",
    backgroundColor: "#101010",
  };

  const style = visible ? styleVisible : styleNonVisible;

  return (
    <Box>
      <AppBar sx={style}>
        <Toolbar variant="dense">
          <IconButton
            onClick={() => navigate("/")}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LiveTvIcon />
          </IconButton>
          <Stack
            spacing={5}
            direction={{ xs: "column", sm: "row" }}
            my={1}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  fontSize: 18,
                  transition: "0.2s",
                },
              }}
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Home
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  fontSize: 18,
                  transition: "0.2s",
                },
              }}
              color="inherit"
              component={RouterLink}
              to="/tvshows/1"
            >
              TV Shows
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  fontSize: 18,
                  transition: "0.2s",
                },
              }}
              color="inherit"
              component={RouterLink}
              to="/movies/1"
            >
              Movies
            </Link>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <FormProvider methods={methods}>
            <Stack
              spacing={5}
              direction={{ xs: "column", sm: "row" }}
              my={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MovieSearch />

              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccountCircleIcon />
                {user?.username}
              </Typography>

              <Button
                onClick={() => {
                  auth.logout(() => navigate("/"));
                }}
                color="inherit"
              >
                <LogoutIcon sx={{ ml: 3, mr: 1 }} /> Logout
              </Button>
            </Stack>
          </FormProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
