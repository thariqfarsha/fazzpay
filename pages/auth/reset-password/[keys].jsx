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
                Now you can create a new password for your Zwallet account. Type
                your password twice so we can confirm your new passsword.
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
                <div className="mb-4"></div>
              )}
              <form onSubmit={handleSubmit}>
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
                    Forgot Password
                  </button>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
