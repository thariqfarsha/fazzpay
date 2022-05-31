import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";

export default function ChangePin() {
  const [isCurrentPinConfirmed, setIsCurrentPinConfirmed] = useState(false);

  const handleCurrentPin = (e) => {
    e.preventDefault();
  };

  const handleChangePin = (e) => {
    e.preventDefault();
  };

  return (
    <MainLayout title={"Change PIN | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <h2 className="fs-5 fw-bold mb-3">Change PIN</h2>
        {isCurrentPinConfirmed ? (
          <p className="opacity-50">
            Type your new 6 digits security PIN to use in FazzPay.
          </p>
        ) : (
          <p className="opacity-50">
            Enter your current 6 digits FazzPay PIN below to continue to the
            next steps.
          </p>
        )}
        <form
          onSubmit={isCurrentPinConfirmed ? handleChangePin : handleCurrentPin}
          className="w-25 mx-auto mt-5 pt-5"
        >
          <label
            htmlFor={isCurrentPinConfirmed ? "newPin" : "currentPin"}
            className="form-label visually-hidden"
          >
            {isCurrentPinConfirmed ? "New PIN" : "Current PIN"}
          </label>
          <input
            type="text"
            id={isCurrentPinConfirmed ? "newPin" : "currentPin"}
            className="form-control w-100 mx-auto text-center px-0 fw-bold fs-5 mb-4"
            maxLength={6}
            placeholder={isCurrentPinConfirmed ? "New PIN" : "Current PIN"}
          />
          <button type="submit" className="btn btn-primary fw-bold w-100">
            {isCurrentPinConfirmed ? "Change PIN" : "Continue"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
