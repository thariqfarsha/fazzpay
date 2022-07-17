import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import PinInput from "../../components/PinInput";
import axios from "../../utils/axios";

export default function ChangePin() {
  const router = useRouter();

  const userId = useSelector((state) => state.user.data.id);

  const [isCurrentPinConfirmed, setIsCurrentPinConfirmed] = useState(false);
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [formPin, setFormPin] = useState({
    pin: "",
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const resetForm = () => {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
    setFormPin({
      pin: "",
    });
  };

  const handleCurrentPin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const fullPin =
        pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      await axios.get(`/user/pin?pin=${fullPin}`);
      setIsLoading(false);
      setIsError(false);
      setMessage("");
      setIsCurrentPinConfirmed(true);
      resetForm();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
      resetForm();
    }
  };

  const handleChangePin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let fullPin =
        pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      fullPin = +fullPin;
      await axios.patch(`/user/pin/${userId}`, { pin: fullPin });
      setIsLoading(false);
      setIsError(false);
      setMessage("PIN updated");
      resetForm();
      setIsCurrentPinConfirmed(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
      resetForm();
    }
  };

  return (
    <MainLayout title={"Change PIN | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Change PIN</h2>
        </div>
        {isCurrentPinConfirmed ? (
          <p className="opacity-50 profile-text">
            Type your new 6 digits security PIN to use in FazzPay.
          </p>
        ) : (
          <p className="opacity-50 profile-text">
            Enter your current 6 digits FazzPay PIN below to continue to the
            next steps.
          </p>
        )}
        <form
          onSubmit={isCurrentPinConfirmed ? handleChangePin : handleCurrentPin}
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
            <div className="mb-3">
              <PinInput pin={pin} setPin={setPin} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary fw-bold w-100">
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : isCurrentPinConfirmed ? (
              "Change PIN"
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
