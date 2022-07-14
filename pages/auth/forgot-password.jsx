import React, { useState } from "react";
import Image from "next/image";
import authImg from "../../public/images/auth-img.png";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [formForgotPass, setFormForgotPass] = useState({
    email: "",
    linkDirect: process.env.URL_RESETPASSWORD,
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormForgotPass({ ...formForgotPass, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post("/auth/forgot-password", formForgotPass);
      setMessage(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Forgot Password | FazzPay"}>
      <div className="w-100 auth-form">
        <div className="d-none d-md-block">
          <h2 className="h4 fw-bold mb-2">
            Did You Forgot Your Password? Don't Worry, You Can Reset Your
            Password In a Minutes.
          </h2>
          <p className="opacity-75">
            To reset your password, you must type your e-mail and we will send a
            link to your email and you will be directed to the reset password
            screens.
          </p>
        </div>
        <div className="d-block d-md-none text-center">
          <h2 className="h4 fw-bold mb-3">Reset Password</h2>
          <p className="opacity-75">
            Enter your FazzPay e-mail so we can send you a password reset link.
          </p>
        </div>
        {message ? (
          <div className="alert alert-success py-2" role="alert">
            {message}
          </div>
        ) : (
          <div className="mt-5"></div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex-grow-1 d-flex flex-column justify-content-between"
        >
          <div className="input-with-icon mb-4">
            <i className="bi bi-envelope input-icon text-secondary"></i>
            <label htmlFor="email" className="form-label visually-hidden">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formForgotPass.email}
              onChange={handleChangeForm}
            />
          </div>
          <button type="submit" className="btn btn-primary fw-bold w-100">
            Confirm
          </button>
        </form>
      </div>
    </Layout>
  );
}
