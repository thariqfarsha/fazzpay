import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import axios from "../../utils/axios";

export default function ChangePassword() {
  const router = useRouter();

  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState({
    currentPwd: false,
    newPwd: false,
    confirmPwd: false,
  });

  const userId = useSelector((state) => state.user.data.id);
  const isAllFormFilled = Object.keys(formPassword).every(
    (el) => formPassword[el]
  );

  useEffect(() => {
    setIsError(false);
    setMessage("");
    resetForm();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
  };

  const resetForm = () => {
    setFormPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPwd({
      currentPwd: false,
      newPwd: false,
      confirmPwd: false,
    });
  };

  const handleUpdatePassword = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await axios.patch(`/user/password/${userId}`, formPassword);
      setIsLoading(false);
      setIsError(false);
      setMessage("Password updated");
      resetForm();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <MainLayout title={"Change Password | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Change Password</h2>
        </div>
        <p className="opacity-50 profile-text">
          You must enter your current password and then type your new password
          twice.
        </p>
        <form
          onSubmit={handleUpdatePassword}
          className="profile-form mx-auto flex-grow-1 d-flex flex-column justify-content-between justify-content-md-center"
        >
          <div>
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
            <div className="input-with-icon mb-4">
              <i className="bi bi-key input-icon text-secondary"></i>
              <label
                htmlFor="currentPassword"
                className="form-label visually-hidden"
              >
                Current Password
              </label>
              <input
                type={showPwd.currentPwd ? "text" : "password"}
                className="form-control"
                id="currentPassword"
                name="oldPassword"
                placeholder="Current password"
                value={formPassword.oldPassword}
                onChange={handleChangeForm}
              />
              <div
                role="button"
                onClick={() =>
                  setShowPwd({ ...showPwd, currentPwd: !showPwd.currentPwd })
                }
              >
                <i
                  className={`bi bi-${
                    showPwd.currentPwd ? "eye-slash" : "eye"
                  } text-secondary position-absolute top-50 end-0 translate-middle`}
                ></i>
              </div>
            </div>
            <div className="input-with-icon mb-4">
              <i className="bi bi-lock input-icon text-secondary"></i>
              <label
                htmlFor="newPassword"
                className="form-label visually-hidden"
              >
                New Password
              </label>
              <input
                type={showPwd.newPwd ? "text" : "password"}
                className="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                value={formPassword.newPassword}
                onChange={handleChangeForm}
              />
              <div
                role="button"
                onClick={() =>
                  setShowPwd({ ...showPwd, newPwd: !showPwd.newPwd })
                }
              >
                <i
                  className={`bi bi-${
                    showPwd.newPwd ? "eye-slash" : "eye"
                  } text-secondary position-absolute top-50 end-0 translate-middle`}
                ></i>
              </div>
            </div>
            <div className="input-with-icon mb-4">
              <i className="bi bi-lock input-icon text-secondary"></i>
              <label
                htmlFor="confirmPassword"
                className="form-label visually-hidden"
              >
                Confirm Password
              </label>
              <input
                type={showPwd.confirmPwd ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat your new password"
                value={formPassword.confirmPassword}
                onChange={handleChangeForm}
              />
              <div
                role="button"
                onClick={() =>
                  setShowPwd({ ...showPwd, confirmPwd: !showPwd.confirmPwd })
                }
              >
                <i
                  className={`bi bi-${
                    showPwd.confirmPwd ? "eye-slash" : "eye"
                  } text-secondary position-absolute top-50 end-0 translate-middle`}
                ></i>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary fw-bold w-100"
            disabled={!isAllFormFilled}
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
