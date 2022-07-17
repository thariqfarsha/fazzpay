import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";

export default function Register() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const isAllFormFilled = Object.keys(formRegister).every(
    (el) => formRegister[el]
  );

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const resultRegister = await axios.post("/auth/register", formRegister);
      setIsLoading(false);
      setIsError(false);
      setMessage("Success! Please check your email to activate your account");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Sign Up | FazzPay"}>
      <div className="w-100 auth-form">
        <div className="d-none d-md-block">
          <h2 className="h4 fw-bold mb-2">
            Start Accessing Your Banking Needs With FazzPay
          </h2>
          <p className="opacity-75 mb-4">
            Transfering money is easier than ever, you can access FazzPay
            wherever you are and whenever you want
          </p>
        </div>
        <div className="d-block d-md-none text-center">
          <h2 className="h4 fw-bold mb-3">Sign Up</h2>
          <p className="opacity-75 mb-4">
            Create your account to access FazzPay
          </p>
        </div>
        {message ? (
          isError ? (
            <div className="alert alert-danger py-2" role="alert">
              {message}
            </div>
          ) : (
            <div className="alert alert-success py-2" role="alert">
              {message}
            </div>
          )
        ) : (
          <div className="mt-4"></div>
        )}
        <form
          onSubmit={handleRegister}
          className="flex-grow-1 d-flex flex-column justify-content-between"
        >
          <div>
            <div className="input-with-icon mb-2">
              <i className="bi bi-person input-icon text-secondary"></i>
              <label
                htmlFor="first-name"
                className="form-label visually-hidden"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                name="firstName"
                placeholder="First Name"
                value={formRegister.firstName}
                onChange={handleChangeForm}
              />
            </div>
            <div className="input-with-icon mb-2">
              <i className="bi bi-person input-icon text-secondary"></i>
              <label htmlFor="last-name" className="form-label visually-hidden">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                name="lastName"
                placeholder="Last Name"
                value={formRegister.lastName}
                onChange={handleChangeForm}
              />
            </div>
            <div className="input-with-icon mb-2">
              <i className="bi bi-envelope input-icon text-secondary"></i>
              <label htmlFor="email" className="form-label visually-hidden">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formRegister.email}
                onChange={handleChangeForm}
              />
            </div>
            <div className="input-with-icon mb-3">
              <i className="bi bi-key input-icon text-secondary"></i>
              <label htmlFor="password" className="form-label visually-hidden">
                Password
              </label>
              <input
                type={showPwd ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formRegister.password}
                onChange={handleChangeForm}
              />
              <div role="button" onClick={() => setShowPwd(!showPwd)}>
                <i
                  className={`bi bi-${
                    showPwd ? "eye-slash" : "eye"
                  } text-secondary position-absolute top-50 end-0 translate-middle`}
                ></i>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary fw-bold my-4 w-100"
            disabled={!isAllFormFilled}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center m-0">
          Already have an account? Let's{" "}
          <Link href="/login">
            <a className="text-primary fw-bold">Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
