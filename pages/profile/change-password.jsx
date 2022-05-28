import React from "react";
import MainLayout from "../../components/Layout/MainLayout";

export default function ChangePassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MainLayout title={"Change Password | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <h2 className="fs-5 fw-bold mb-3">Change Password</h2>
        <p className="opacity-50">
          You must enter your current password and then type your new password
          twice.
        </p>
        <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5 pt-3">
          <div className="input-with-icon mb-4">
            <i className="bi bi-key input-icon text-secondary"></i>
            <label for="currentPassword" className="form-label visually-hidden">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              name="currentPassword"
              placeholder="Current password"
            />
          </div>
          <div className="input-with-icon mb-4">
            <i className="bi bi-lock input-icon text-secondary"></i>
            <label for="newPassword" className="form-label visually-hidden">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="New password"
            />
          </div>
          <div className="input-with-icon mb-5">
            <i className="bi bi-lock input-icon text-secondary"></i>
            <label for="confirmPassword" className="form-label visually-hidden">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repeat your new password"
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
