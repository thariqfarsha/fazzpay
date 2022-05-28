import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Head from "next/head";
import Navbar from "../Navbar";

export default function MainLayout(props) {
  const [isNotifShown, setIsNotifShown] = useState(false);

  const handleTopupSubmit = () => {
    return;
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header isNotifShown={isNotifShown} setIsNotifShown={setIsNotifShown} />
      <main className="vh-100" onClick={() => setIsNotifShown(false)}>
        <div className="container-lg py-4 h-100">
          <div className="row h-100">
            <div className="col-3 h-100">
              <Navbar />
            </div>
            <div className="col-9 h-100">{props.children}</div>
          </div>
        </div>
      </main>
      <Footer />

      {/* TOPUP MODAL */}
      <div
        className="modal fade"
        id="topupModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="topupModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="topupModal">
                Top Up
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleTopupSubmit}>
              <div className="modal-body">
                <p className="opacity-75">
                  Enter the amount of money, and click submit
                </p>
                <input
                  type="number"
                  className="form-control w-50 mx-auto text-center px-0 fw-bold fs-5"
                  max={10000000}
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
