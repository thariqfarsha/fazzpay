import React, { useEffect, useState } from "react";
import Image from "next/image";
import authImg from "../../../public/images/auth-img.png";
import Layout from "../../../components/Layout/AuthLayout";
import { useRouter } from "next/router";
import axios from "../../../utils/axios";

export default function ResetPassword() {
  const router = useRouter();
  const keys = router.query.keys;

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [formNewPassword, setFormNewPassword] = useState({
    keysChangePassword: keys,
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormNewPassword({ ...formNewPassword, keysChangePassword: keys });
  }, [keys]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormNewPassword({ ...formNewPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.patch("/auth/reset-password", formNewPassword);
      setIsError(false);
      setMessage(result.data.data.msg);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Reset Password | FazzPay"}>
      <div className="w-100 auth-form">
        <div className="d-none d-md-block">
          <h2 className="h4 fw-bold mb-2">
            Did You Forgot Your Password? Don't Worry, You Can Reset Your
            Password In a Minutes.
          </h2>
          <p className="opacity-75 mb-4">
            Now you can create a new password for your FazzPay account. Type
            your password twice so we can confirm your new passsword.
          </p>
        </div>
        <div className="d-block d-md-none text-center">
          <h2 className="h4 fw-bold mb-3">Reset Password</h2>
          <p className="opacity-75 mb-4">
            Create and confirm your new password so you can login to FazzPay
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
          <div className="mb-4"></div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex-grow-1 d-flex flex-column justify-content-between"
        >
          <div>
            <div className="input-with-icon mb-3">
              <i className="bi bi-lock input-icon text-secondary"></i>
              <label
                htmlFor="new-password"
                className="form-label visually-hidden"
              >
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                name="newPassword"
                placeholder="Enter your new password"
                value={formNewPassword.newPassword}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="input-with-icon mb-4">
              <i className="bi bi-lock input-icon text-secondary"></i>
              <label
                htmlFor="confirm-password"
                className="form-label visually-hidden"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={formNewPassword.confirmPassword}
                onChange={handleChangeForm}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`btn ${
                isError ? "btn-outline-primary" : "btn-primary"
              } fw-bold w-100`}
            >
              Reset Password
            </button>
            {isError ? (
              <button
                type="button"
                className="btn btn-primary fw-bold w-100 mt-2"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Resend Email
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </Layout>
  );
}
