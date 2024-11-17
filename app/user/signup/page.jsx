"use client";

import React from "react";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

const postData = async (data) => {
  const Response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};

function page() {
  const router = useRouter();

  return (
    <>
      <div className="font-[sans-serif] bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-0 h-full">
          <Box
            sx={{
              display: { md: "block", xs: "none" },
              backgroundImage: "url(/img/background.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              width: "100%",
              position: "relative",
              overflow: "hidden", // To contain the pseudo-element within the div
            }}
          >
            <div
              style={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
                zIndex: 1,
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Your content goes here */}
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  padding: "65px 10px",
                }}
              >
                <div>
                  <h1 style={{ color: "white", fontWeight: "700" }}>
                    Welcome to{" "}
                    <span
                      style={{
                        background: "linear-gradient(to right, orange, yellow)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "800",
                        fontSize: "1.2em",
                      }}
                    >
                      Traderscrib
                    </span>
                  </h1>
                  <h5 style={{ color: "#d9d6d6", fontSize: "0.9em" }}>
                    Join us in turning Capital into Profits—Fast Payouts, Zero
                    Risk, Pro-Trading awaits you!
                  </h5>
                </div>
              </Box>
            </div>
          </Box>

          <div
            style={{
              height: "100vh",
              overflowY: "scroll",
              backgroundColor: "#0C172C",
            }}
          >
            {/* form here */}
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                country: "",
                phoneNumber: "",
                accountType: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.username) {
                  errors.username = "Required";
                }
                if (!values.country) {
                  errors.country = "Required";
                }
                if (!values.phoneNumber) {
                  errors.phoneNumber = "Required";
                }
                if (!values.accountType) {
                  errors.accountType = "Required";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = "Required";
                }
                if (
                  values.password &&
                  values.confirmPassword &&
                  values.password !== values.confirmPassword
                ) {
                  errors.confirmPassword = "passwords dont match";
                  errors.password = "passwords dont match";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log("values", values);
                try {
                  const data = await postData(values);
                  console.log("auth", data);

                  if (data.ok) {
                    const status = await signIn("credentials", {
                      redirect: false,
                      email: values.email,
                      password: values.password,
                      callbackUrl: "/",
                    });
                    console.log("status", status);
                    if (status.ok) {
                      alert("should be nativating to users");
                      router.push("/user");
                      setSubmitting(false);
                    }
                  }
                  if (!data.ok) {
                    const res = await data.json();
                    console.log(res);
                    toast.error(res.message, {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                    setSubmitting(false);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="max-w-lg w-full mx-auto h-90vh"
                  style={{ marginTop: "50px", padding: "0px 15px" }}
                >
                  <div className="mb-12">
                    <h3 className="text-3xl font-bold text-yellow-400">
                      Create an account
                    </h3>
                  </div>

                  <div>
                    <label className="text-white text-xs block mb-2">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="username"
                        type="text"
                        required
                        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <span style={{ color: "red" }}>
                      {errors.username && touched.username && errors.username}
                    </span>
                  </div>
                  <div className="mt-8">
                    <label className="text-white text-xs block mb-2">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                              d="M0 512h512V0H0Z"
                              data-original="#000000"
                            ></path>
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <Stack
                    direction={{
                      md: "row",
                      xs: "column",
                    }}
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <div className="mt-8 w-[100%] lg:w-[40%]">
                      <label className="text-white text-xs block mb-2">
                        Country
                      </label>
                      <div className="relative flex items-center">
                        <select
                          name="country"
                          type="text"
                          required
                          className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                        >
                          <option
                            value="United States"
                            style={{ color: "white" }}
                          >
                            United states
                          </option>
                          <option value="Nigeria" style={{ color: "white" }}>
                            Nigeria{" "}
                          </option>
                        </select>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {errors.country && touched.country && errors.country}
                      </span>
                    </div>
                    <div className="mt-8 w-[100%] lg:w-[40%]">
                      <label className="text-white text-xs block mb-2">
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="phoneNumber"
                          type="number"
                          required
                          className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                          placeholder="+234 XXXXXXX"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {errors.phoneNumber &&
                          touched.phoneNumber &&
                          errors.phoneNumber}
                      </span>
                    </div>
                  </Stack>
                  <div className="mt-8">
                    <label className="text-white text-xs block mb-2">
                      Account Type
                    </label>
                    <div className="relative flex items-center">
                      <select
                        name="accountType"
                        type="text"
                        required
                        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.accountType}
                      >
                        <option value="default" style={{ color: "black" }}>
                          Default
                        </option>
                        <option value="basic" style={{ color: "black" }}>
                          Basic
                        </option>
                        <option value="pro" style={{ color: "black" }}>
                          Pro
                        </option>
                        <option value="ultimate" style={{ color: "black" }}>
                          Ultimate
                        </option>
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                              d="M0 512h512V0H0Z"
                              data-original="#000000"
                            ></path>
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-8">
                    <label className="text-white text-xs block mb-2">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type="password"
                        required
                        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                  <div className="mt-8">
                    <label className="text-white text-xs block mb-2">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                        placeholder="Enter password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </span>
                  </div>

                  <div className="flex items-center mt-8">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-white ml-3 block text-sm"
                    >
                      I accept the{" "}
                      <a
                        href="/"
                        className="text-yellow-500 font-semibold hover:underline ml-1"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>

                  <div className="mt-12">
                    <button
                      onClick={handleSubmit}
                      style={{ background: "#e4c10e", color: "white" }}
                      type="submit"
                      className="btn-md button-theme btn-block"
                      // disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                    <p className="text-sm text-white mt-8">
                      Already have an account?{" "}
                      <a
                        href="/user/login"
                        className="text-yellow-400 font-semibold hover:underline ml-1"
                      >
                        Login here
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default page;
