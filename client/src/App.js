import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />}></Route>
          <Route path="register" element={<RegisterComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
