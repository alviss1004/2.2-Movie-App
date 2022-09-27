import { Button, Stack, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  username: "",
  password: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 4, lg: 6 }}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://s3-us-west-2.amazonaws.com/prd-rteditorial/wp-content/uploads/2018/03/13153742/RT_300EssentialMovies_700X250.jpg"
          alt=""
          width="60%"
          height="400px"
        />
        <Box
          boxShadow={6}
          sx={{
            backgroundColor: "#0E0D0D",
            height: "55vh",
            minHeight: "450px",
            width: "20vw",
            minWidth: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            border: "0.5px solid #2B2929",
          }}
        >
          <Stack spacing={3} sx={{ width: "350px" }}>
            <Typography variant="h4" textAlign="center">
              Sign In
            </Typography>
            <FTextField name="username" label="Username" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FCheckbox name="remember" label="Remember Me" />
            <Button
              type="submit"
              variant="contained"
              sx={{ fontSize: 18, backgroundColor: "#E05151" }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
