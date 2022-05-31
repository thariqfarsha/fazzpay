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
      const resultCreatePin = await axios.patch(`/user/pin/${userId}`, {
        pin: fullPin,
      });
      setIsCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Create PIN | FazzPay"}>
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
          <div className="col-5 p-5 ">
            {!isCreated ? (
              <div>
                <h2 className="h4 fw-bold mb-2">
                  Secure Your Account, Your Wallet, and Your Data With 6 Digits
                  PIN
                </h2>
                <p className="opacity-75 mb-5">
                  Create 6 digits pin to secure all your money and your data in
                  FazzPay app. Keep it secret and don't tell anyone about your
                  FazzPay account password and the PIN.
                </p>
                <form onSubmit={handleCreatePin} className="w-75 mx-auto">
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
              <div>
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
                <h2 className="h4 fw-bold mt-3 mb-2">
                  Your PIN Is Successfully Created
                </h2>
                <p className="opacity-75 mb-5">
                  Your PIN is successfully created and you can now access all
                  the features in FazzPay.
                </p>
                <button
                  className="btn btn-primary fw-bold w-100 shadow"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
