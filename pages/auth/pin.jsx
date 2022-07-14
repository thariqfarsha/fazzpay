import React, { useEffect, useState } from "react";
import Image from "next/image";
import authImg from "../../public/images/auth-img.png";
import Layout from "../../components/Layout/AuthLayout";
import axios from "../../utils/axios";
import PinInput from "../../components/PinInput";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function createPIN() {
  const router = useRouter();

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
  const userId = useSelector((state) => state.user.data.id);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    setFormPin({ pin: "" });
  }, []);

  const handleCreatePin = async (e) => {
    try {
      e.preventDefault();
      let fullPin =
        pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      fullPin = +fullPin;
      await axios.patch(`/user/pin/${userId}`, {
        pin: fullPin,
      });
      setIsCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Create PIN | FazzPay"}>
      {!isCreated ? (
        <div className="w-100 auth-form">
          <div className="d-none d-md-block">
            <h2 className="h4 fw-bold mb-2">
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            </h2>
            <p className="opacity-75 mb-5">
              Create 6 digits pin to secure all your money and your data in
              FazzPay app. Keep it secret and don't tell anyone about your
              FazzPay account password and the PIN.
            </p>
          </div>
          <div className="d-block d-md-none text-center">
            <h2 className="h4 fw-bold mb-4">Create Security PIN</h2>
            <p className="opacity-75 mb-5">
              Create a PIN that contains 6 digits number for security purpose in
              FazzPay
            </p>
          </div>
          <form
            onSubmit={handleCreatePin}
            className="flex-grow-1 d-flex flex-column justify-content-between"
          >
            <PinInput pin={pin} setPin={setPin} />
            <button
              type="submit"
              className="btn btn-primary fw-bold w-100 mt-3"
            >
              Confirm
            </button>
          </form>
        </div>
      ) : (
        <div className="w-100 auth-form justify-content-between">
          <div className="text-center text-md-start">
            <i className="bi bi-check-circle-fill fs-1 text-success"></i>
            <h2 className="h4 fw-bold mt-4 mt-md-3 mb-3">
              Your PIN Is Successfully Created
            </h2>
            <p className="opacity-75 mb-5">
              Your PIN is successfully created and you can now access all the
              features in FazzPay.
            </p>
          </div>
          <button
            className="btn btn-primary fw-bold w-100 shadow"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </Layout>
  );
}
