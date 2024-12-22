import React from "react";
import { Route, Routes } from "react-router-dom";

import M07App from "../M07App";
import Login from "../Login";

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<M07App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RootRoutes;
