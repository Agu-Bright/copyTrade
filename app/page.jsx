"use client";

import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "./main.css";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/user");
  // }, [router]);
  return (
    <div className="index-page">
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a
            href="/user"
            className="logo d-flex align-items-center me-auto d-block"
          >
            {/* <img src="/img/logo.png" alt="" /> */}
            <h1 className="sitename">TradersCrib</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#home" className="active">
                  Home
                  <br />
                </a>
              </li>
              <li>
                <a href="#trading">Trading</a>
              </li>
              <li>
                <a href="#investment">Investment</a>
              </li>
              <li>
                <a href="#capital">Capital</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a
            className="btn-getstarted flex-md-shrink-0 d-block"
            href="/user/login"
          >
            Sign in
          </a>
        </div>
      </header>

      <main className="main">
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="gradient-text">Landing page coming soon...</h1>
        </div>
      </main>
      <footer id="footer" className="footer">
        <div className="container copyright text-center mt-4">
          <p>
            @ <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Traderscrib</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
