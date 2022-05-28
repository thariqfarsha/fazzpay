import React, { useState } from "react";
import Image from "next/image";
import authImg from "../../public/images/auth-img.png";
import Layout from "../../components/Layout/AuthLayout";

export default function createPIN() {
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
          <div className="col-5 px-5 d-flex justify-content-center align-items-center">
            <div>
              <h2 className="h4 fw-bold mb-2">
                Secure Your Account, Your Wallet, and Your Data With 6 Digits
                PIN
              </h2>
              <p className="opacity-75 mb-4">
                Create 6 digits pin to secure all your money and your data in
                FazzPay app. Keep it secret and don't tell anyone about your
                FazzPay account password and the PIN.
              </p>
              <form>
                <div className="d-flex mb-3">
                  <div>
                    <label for="pin1" className="form-label visually-hidden">
                      Pin 1st Digit
                    </label>
                    <input
                      type="text"
                      maxLength={1}
                      className="form-control border rounded"
                      id="pin1"
                      placeholder="_"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary fw-bold mt-4 mb-5 w-100"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
