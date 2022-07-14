import React from "react";
import Head from "next/head";
import Image from "next/image";
import authImg from "../../public/images/auth-img.png";

export default function AuthLayout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <main className="auth-main vh-100">
        <div className="container-lg px-0 px-md-5 pt-5 pb-0 py-md-4 h-100 d-flex flex-column align-items-center overflow-hidden">
          <h1 className="d-block d-md-none fw-bold text-primary my-5">
            FazzPay
          </h1>
          <div className="row auth-card w-100 h-100 bg-white shadow border">
            <div
              className="col-md-7 d-none d-md-block h-100 position-relative overflow-hidden"
              style={{
                backgroundImage: "url(/images/auth-bg-img.png)",
                borderTopLeftRadius: 28,
                borderBottomLeftRadius: 28,
              }}
            >
              <h1 className="h2 fw-bold text-white px-5 py-4 position-absolute top-0 start-0">
                FazzPay
              </h1>
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{ width: "auto", height: "100%", top: "12%" }}
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
            <div className="col-md-5 px-4 px-md-5 d-flex justify-content-center align-items-center">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
