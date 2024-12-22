import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AppBarCustom() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Tambahkan useNavigate

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInStatus");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      const storedUserId = localStorage.getItem("id");
      const storedToken = localStorage.getItem("token");
      setUserId(storedUserId);
      setToken(storedToken);
    } else {
      setIsLoggedIn(false);
      setUserId("");
      setToken("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInStatus");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    setToken("");
  };

  const handleLoginClick = () => {
    navigate("/login"); // Tambahkan navigasi ke halaman login
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Avatar
          src="/static/images/avatar/1.jpg"
          sx={{ ml: 0 }}
          style={{ marginRight: "15px" }}
        />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          component="legend"
        ></Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Features
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Enterprise
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Support
          </Link>
        </nav>
        {isLoggedIn ? (
          <li>
            Welcome, user {userId}{" "}
            <Button onClick={handleLogout}>LogOut</Button>
          </li>
        ) : (
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={handleLoginClick} // Ubah dari href ke onClick
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
