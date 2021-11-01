import React from "react";
import { Header } from "./Header";
import "./Layout.scss";

export const Layout = ({ children }) => (
    
  <div className="container">
    <div className="row">
      <div className="col-md">
        <Header />
      </div>
    </div>
    <div className="row layout-wrapper">
      <div className="col-md">{children}</div>
    </div>
  </div>
);
