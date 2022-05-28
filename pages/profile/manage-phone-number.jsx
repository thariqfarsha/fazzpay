import React from "react";
import MainLayout from "../../components/Layout/MainLayout";

export default function ManagePhoneNumber() {
  const userData = {
    id: 7,
    firstName: "Robert",
    lastName: "Chandler",
    email: "pewdiepie1@gmail.com",
    noTelp: "+6281393877946",
  };

  return (
    <MainLayout title={"Manage Phone Number | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <h2 className="fs-5 fw-bold mb-3">Manage Phone Number</h2>
        <p className="opacity-50">
          You can only delete the phone number and then you must add another
          phone number.
        </p>
        <div className="rounded shadow-sm p-3 mb-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="opacity-75 fs-7 mb-1">Primary</p>
            <p className="fw-bold m-0">{userData.noTelp}</p>
          </div>
          <button className="btn">
            <i className="bi bi-trash3 opacity-75 text-danger"></i>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
