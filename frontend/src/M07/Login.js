import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import HttpsIcons from "@mui/icons-material/Https";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitLogin = async () => {
    setError(""); // Reset error sebelum login

    // Ubah id ke integer
    const intId = parseInt(id, 10);

    // Jika user id = 1 dan password = 123, arahkan langsung ke home
    if (intId === 1 && password === "123") {
      console.log("Halo, selamat datang!");
      localStorage.setItem("id", 1); // Simpan ID ke localStorage
      navigate("/"); // Arahkan ke halaman utama (M07App di route "/")
      return; // Stop fungsi, tidak lanjut ke backend
    }

    // Jika user lain, lakukan login ke backend
    try {
      const response = await axios.post(
        "http://localhost:3001/web/auth/login",
        { id: intId, password }
      );

      if (response.status === 200) {
        console.log("Login berhasil!", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate("/"); // Redirect ke home setelah login sukses
      }
    } catch (error) {
      console.error("Login gagal", error);
      setError("ID atau password salah. Silakan coba lagi.");
    }
  };

  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "#008CBA",
  };
  const btnStyle = {
    margin: "8px 0",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid alignContent={"center"}>
          <Avatar style={avatarStyle}>
            <HttpsIcons />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="UserID"
          value={id}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="Enter ID"
          variant="outlined"
          fullWidth
          required
          type="number" // Input hanya angka
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          onClick={submitLogin}
          color="primary"
          variant="outlined"
          style={btnStyle}
          fullWidth
        >
          Sign In
        </Button>
        <Typography>
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography>
          Do you have an account? <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
