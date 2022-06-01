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

  const userId = useSelector((state) => state.user.data.id);

  useEffect(() => {
    setIsError(false);
    setMessage("");
    resetForm();
  }, []);

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
  };

  const handleUpdatePassword = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`/user/password/${userId}`, formPassword);
      setIsError(false);
      setMessage("Password updated");
      resetForm();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <MainLayout title={"Change Password | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <div className="d-flex align-items-center mb-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Change Password</h2>
        </div>
        <p className="opacity-50 w-50">
          You must enter your current password and then type your new password
          twice.
        </p>
        <form onSubmit={handleUpdatePassword} className="w-50 mx-auto pt-3">
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
              type="password"
              className="form-control"
              id="currentPassword"
              name="oldPassword"
              placeholder="Current password"
              value={formPassword.oldPassword}
              onChange={handleChangeForm}
            />
          </div>
          <div className="input-with-icon mb-4">
            <i className="bi bi-lock input-icon text-secondary"></i>
            <label htmlFor="newPassword" className="form-label visually-hidden">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              value={formPassword.newPassword}
              onChange={handleChangeForm}
            />
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
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repeat your new password"
              value={formPassword.confirmPassword}
              onChange={handleChangeForm}
            />
          </div>
          <button type="submit" className="btn btn-primary fw-bold w-100">
            Change Password
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
