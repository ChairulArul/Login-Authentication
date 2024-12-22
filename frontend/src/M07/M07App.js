import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AppBarCustom } from "./components/AppBarCustom";
import { BannerCustom } from "./components/BannerCustom";
import { PricingPlan } from "./components/PricingPlan";
import { Footer } from "./components/Footer";

const defaultTheme = createTheme();

function M07App() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("id"); // Ambil ID dari localStorage
    if (userId === "1") {
      setWelcomeMessage("Halo ID 1, selamat datang di aplikasi kami!");
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBarCustom />

      {welcomeMessage && ( // Tampilkan pesan jika ada
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2>{welcomeMessage}</h2>
        </div>
      )}

      <BannerCustom />
      <PricingPlan />
      <Footer />
    </ThemeProvider>
  );
}

export default M07App;
