import React, { useState } from "react";
import Image from "next/image";
import authImg from "../../public/images/auth-img.png";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [formForgotPass, setFormForgotPass] = useState({
    email: "",
    linkDirect: "http://localhost:3000/auth/reset-password",
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
      <div className="container-lg px-5 py-4 vh-100">
        <div className="row h-100 shadow rounded border">
          <div
            className="col-7 rounded-start h-100 position-relative overflow-hidden"
            style={{
              backgroundImage: "url(/images/auth-bg-img.png)",
            }}
          >
            <h1 className="h2 fw-bold text-white px-5 py-4 position-absolute top-0 start-0">
              FazzPay
            </h1>
            <div
              className="position-absolute start-50 translate-middle-x"
              style={{ width: "59%", height: "auto", top: "12%" }}
            >
              <Image src={authImg} alt="login page illustration" />
            </div>
            <div className="px-5 py-4 position-absolute bottom-0 start-0">
              <h2 className="h5 fw-bold text-white">
                App that Covering Banking Needs.
              </h2>
              <p className="text-white opacity-75 m-0">
                FazzPay is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in FazzPay everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
          <div className="col-5 p-5">
            <div>
              <h2 className="h4 fw-bold mb-2">
                Did You Forgot Your Password? Don't Worry, You Can Reset Your
                Password In a Minutes.
              </h2>
              <p className="opacity-75">
                To reset your password, you must type your e-mail and we will
                send a link to your email and you will be directed to the reset
                password screens.
              </p>
              {message ? (
                <div className="alert alert-success py-2" role="alert">
                  {message}
                </div>
              ) : (
                <div className="mt-5"></div>
              )}
              <form onSubmit={handleSubmit}>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
