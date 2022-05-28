import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/MainLayout";
import UserCard from "../components/UserCard";
import blankProfile from "../public/profiles/blank.png";

export default function Transfer() {
  // DATA DUMMY
  const users = [
    {
      id: 1,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 2,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 3,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 4,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 5,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 6,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 7,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
    {
      id: 8,
      firstName: "Samuel",
      lastName: "Suhi",
      noTelp: "083123456789",
      image: blankProfile,
    },
  ];

  const [selectedReceiver, setReceiver] = useState({});
  const [formTransfer, setFormTransfer] = useState({
    receiverId: "",
    amount: 0,
    notes: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const transferDetails = [
    { name: "Amount", value: formTransfer.amount },
    { name: "Balance Left", value: 20000 },
    { name: "Date & Time", value: "2022 - 05 - 01" },
    { name: "Notes", value: formTransfer.notes },
  ];

  useEffect(() => {
    setReceiver({});
    setFormTransfer({
      receiverId: "",
      amount: "",
      notes: "",
    });
  }, []);

  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const handleSelectReceiver = (user) => {
    setReceiver(user);
    setFormTransfer({ ...formTransfer, receiverId: user.id });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormTransfer({ ...formTransfer, [name]: value });
  };

  const handleFormTransfer = (e) => {
    e.preventDefault();
    setIsFormFilled(true);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <Layout title={"Transfer | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 overflow-hidden position-relative">
        {Object.keys(selectedReceiver).length === 0 ? (
          <>
            {/* SELECT RECEIVER */}
            <h2 className="fs-5 fw-bold mb-3">Search Receiver</h2>
            <div className="input-with-icon mb-3">
              <input
                type="text"
                className="search-box rounded bg-secondary bg-opacity-25 border-0 ps-5 pe-3 py-2 w-100"
                placeholder="Search receiver here"
              />
              <i className="bi bi-search input-icon opacity-75 ms-2"></i>
            </div>
            <div className="card-wrapper p-1" style={{ height: "75%" }}>
              {users.map((user) => (
                <div
                  className="user-card rounded mb-2"
                  onClick={() => handleSelectReceiver(user)}
                  key={user.id}
                >
                  <UserCard data={user} />
                </div>
              ))}
            </div>
          </>
        ) : !isFormFilled ? (
          <>
            {/* TRANSFER FORM */}
            <h2 className="fs-5 fw-bold mb-3">Transfer Money</h2>
            <UserCard data={selectedReceiver} />
            <form
              onSubmit={handleFormTransfer}
              autoComplete="off"
              className="pt-5"
            >
              <input
                type="number"
                name="amount"
                min={1}
                max={10000000}
                className="transfer__amount-input fs-1 fw-bold border-0 text-primary text-center mb-3 w-100"
                placeholder="0"
                aria-label="amount of money to transfer"
                onChange={handleChangeForm}
                value={formTransfer.amount}
                required
              />
              <p className="fw-bold text-center">Rp120.000 Available</p>
              <div className="input-with-icon w-50 mx-auto">
                <input
                  type="text"
                  maxLength={20}
                  name="notes"
                  className="form-control"
                  placeholder="Add some notes"
                  aria-label="transfer notes"
                  onChange={handleChangeForm}
                  value={formTransfer.notes}
                />
                <i className="bi bi-pen input-icon opacity-50"></i>
              </div>
              <div className="position-absolute bottom-0 end-0 p-4">
                <button
                  type="button"
                  className="btn btn-outline-primary fw-bold px-4 me-2"
                  onClick={() => setReceiver({})}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary fw-bold px-4">
                  Continue
                </button>
              </div>
            </form>
          </>
        ) : !isConfirmed ? (
          <>
            {/* TRANSFER CONFIRMATION */}
            <h2 className="fs-5 fw-bold mb-3">Transfer To</h2>
            <div className="mb-4">
              <UserCard data={selectedReceiver} />
            </div>
            <h3 className="fs-5 fw-bold mb-2">Details</h3>
            <div className="row row-cols-2">
              {transferDetails.map((detail, index) => (
                <div key={index} className="col">
                  <div className="mb-3 rounded shadow-sm p-3">
                    <p className="fs-7 opacity-75 mb-1">{detail.name}</p>
                    <p className="fw-bold m-0 text-truncate">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="position-absolute bottom-0 end-0 p-4">
              <button
                type="button"
                className="btn btn-outline-primary fw-bold px-4 me-2"
                onClick={() => setIsFormFilled(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary fw-bold px-4"
                data-bs-toggle="modal"
                data-bs-target="#pinInputModal"
              >
                Continue
              </button>
            </div>
          </>
        ) : !isError ? (
          <>
            {/* TRANSFER SUCCESS */}
            <h1>Success</h1>
          </>
        ) : (
          <>
            {/* TRANSFER FAILED */}
            <h1>Failed</h1>
          </>
        )}
      </div>

      {/* PIN INPUT MODAL */}
      <div
        className="modal fade"
        id="pinInputModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="pinInputModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="pinInputModal">
                Enter PIN to Transfer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handlePinSubmit}>
              <div className="modal-body">
                <p className="opacity-75">
                  Enter your 6 digits PIN for confirmation to continue
                  transferring money.
                </p>
                <input
                  type="text"
                  className="form-control w-25 mx-auto text-center px-0 fw-bold fs-5"
                  maxLength={6}
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  data-bs-dismiss={isConfirmed ? "modal" : ""}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
