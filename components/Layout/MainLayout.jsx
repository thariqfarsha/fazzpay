import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Head from "next/head";
import Navbar from "../Navbar";
import axios from "../../utils/axios";
import BottomBar from "../BottomBar";
import { useRouter } from "next/router";

export default function MainLayout(props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isNotifShown, setIsNotifShown] = useState(false);
  const [formTopup, setFormTopup] = useState({
    amount: "",
  });

  const handleChangeTopupForm = (e) => {
    setFormTopup({ ...formTopup, amount: e.target.value });
  };

  const handleTopupSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const resultTopup = await axios.post("/transaction/top-up", formTopup);
      window.open(resultTopup.data.data.redirectUrl);
      setIsLoading(false);
      setFormTopup({ amount: "" });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header isNotifShown={isNotifShown} setIsNotifShown={setIsNotifShown} />
      <main
        className={router.pathname === "/dashboard" ? "main-dashboard" : "main"}
        onClick={() => setIsNotifShown(false)}
      >
        <div className="container-lg py-4 h-100">
          <div className="row h-100">
            <div className="col-3 d-none d-md-block h-100">
              <Navbar />
            </div>
            <div className="col-md-9 h-100">{props.children}</div>
          </div>
        </div>
      </main>
      <BottomBar />
      <Footer />

      {/* TOPUP MODAL */}
      <div
        className="modal fade"
        id="topupModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="topupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="topupModalLabel">
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
                  min={1000}
                  max={10000000}
                  onChange={handleChangeTopupForm}
                  value={formTopup.amount}
                  placeholder="0"
                  required
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className="btn btn-primary px-4 flex-grow-1 flex-md-grow-0"
                  disabled={!formTopup.amount}
                  // data-bs-dismiss="modal"
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
