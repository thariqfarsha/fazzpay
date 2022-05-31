import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import authImg from "../../public/images/auth-img.png";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";

export default function Register() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const resultRegister = await axios.post("/auth/register", formRegister);
      setIsError(false);
      setMessage("Success! Please check your email to activate your account");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsError(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Sign Up | FazzPay"}>
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
              <Image src={authImg} alt="register page illustration" />
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
          <div className="col-5 px-5 d-flex justify-content-center align-items-center">
            <div>
              <h2 className="h4 fw-bold mb-2">
                Start Accessing Your Banking Needs With FazzPay
              </h2>
              <p className="opacity-75">
                Transfering money is easier than ever, you can access FazzPay
                wherever you are and whenever you want.
              </p>
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
              <form onSubmit={handleRegister}>
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
                  <label
                    htmlFor="last-name"
                    className="form-label visually-hidden"
                  >
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
                  <label
                    htmlFor="password"
                    className="form-label visually-hidden"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formRegister.password}
                    onChange={handleChangeForm}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary fw-bold my-4 w-100"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center m-0">
                Already have an account? Let's{" "}
                <Link href="/login">
                  <a className="text-primary fw-bold">Login</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
