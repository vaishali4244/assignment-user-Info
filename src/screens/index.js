import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../components/dashBoard/dashBoard";

const Screen = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
    </Routes>
  );
};

export default Screen;
