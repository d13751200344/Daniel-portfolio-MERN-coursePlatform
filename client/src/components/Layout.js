import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import React from "react";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
