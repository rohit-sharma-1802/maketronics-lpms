import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/images/logo.webp";
import Colors from "../utils/Colors";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constant";
import Cookies from "js-cookie";

const setTokenAsCookie = (token) => {
  Cookies.set("token", token, {
    expires: 30,
    secure: true,
    sameSite: "strict",
  });
};

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("email", email);
    const loginDetails = {
      email: email,
      password: password,
      role: "Admin",
    };
    axios
      .post(`${API_BASE_URL}/login`, loginDetails)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", email);
        setTokenAsCookie(res.data.token);
        navigate(`/Product/View`);
      })
      .catch((err) => {
        setErrorMessage(`Problem in Fetching Data ${err.message}`);
      });
  };

  const handleChange = (label, value, heading) => {
    if (heading === "email") setEmail(value);
    else setPassword(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <div className={classes.imageContainer}>
            <img src={LOGO} alt="Sign In" className={classes.image} />
          </div>
          <div className={classes.loginFormText}>
            <Typography component="h3" variant="h5" align="center">
              Login
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              Welcome back! Please login to continue.
            </Typography>
          </div>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => handleChange("email", e.target.value, "email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) =>
                handleChange("password", e.target.value, "password")
              }
            />
            {errorMessage && (
              <Typography color="error" variant="body2" paddingBlock={3}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: Colors.black,
                "&:hover": {
                  backgroundColor: Colors.primary,
                },
                marginTop: "10px",
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;

const useStyles = makeStyles(() => ({
  mainContainer: {
    backgroundColor: Colors.black,
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    margin: "auto",
    maxWidth: 500,
    borderRadius: 12,
    boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
    border: "1px solid #bdbdbd",
  },
  form: {
    width: "100%",
    marginTop: "8px",
  },
  loginFormText: {
    margin: '20px 0',
    textAlign: 'center',
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 100,
    overflow: "hidden",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
