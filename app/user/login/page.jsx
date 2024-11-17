"use client";
import React, { useContext, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Formik } from "formik";
import { CircularProgress, Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/user");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161722",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/user");
  } else
    return (
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
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const status = await signIn("credentials", {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                  callbackUrl: "/",
                });
                if (status.ok) {
                  console.log("routign");
                  location.reload();
                  // router.push("/");
                  // setSubmitting(false);
                }
                if (!status.ok) {
                  toast.error(status.error, {
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

                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="max-w-lg w-full mx-auto h-90vh "
                  style={{ marginTop: "50px", padding: "0px 15px" }}
                >
                  <div className="mb-12">
                    <h3 className="text-3xl font-bold text-yellow-400">
                      Sign in{" "}
                    </h3>
                  </div>

                  <div className="mt-8">
                    <label className="text-white text-xs block mb-2">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        required
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
                        autoComplete="on"
                      />
                      <span
                        style={{
                          borderLeft: "none",
                          height: "100%",
                        }}
                        onClick={() => setViewPassword((prev) => !prev)}
                        className="text-xl absolute font-bold right-[23px] top-[5px]"
                      >
                        {viewPassword ? (
                          <VisibilityIcon
                            fontSize="small"
                            className="size-4 text-gray-500"
                          />
                        ) : (
                          <VisibilityOffIcon
                            fontSize="small"
                            className="size-4 text-gray-500"
                          />
                        )}
                      </span>
                    </div>
                    <span style={{ color: "red" }}>
                      {errors.password && touched.password && errors.password}
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
                      style={{ background: "#f3b455", color: "white" }}
                      type="submit"
                      className="btn-md button-theme btn-block"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                    <p className="text-sm text-white mt-8">
                      Don't have an account?{" "}
                      <a
                        href="/user/signup"
                        className="text-yellow-400 font-semibold hover:underline ml-1"
                      >
                        Sign up here
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
}

export default page;
