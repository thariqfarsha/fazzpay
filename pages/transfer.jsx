import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/MainLayout";
import UserCard from "../components/UserCard";
import axiosServer from "../utils/axiosServer";
import axios from "../utils/axios";
import cookies from "next-cookies";
import currency from "../utils/currency";
import date from "../utils/date";
import { useSelector } from "react-redux";
import PinInput from "../components/PinInput";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
  try {
    const dataCookies = cookies(context);
    const params = context.query;
    const page = !params?.page ? 1 : params.page;
    const search = !params?.search ? "" : params.search;
    const sort = !params?.sort ? "firstName ASC" : params.sort;
    const result = await axiosServer.get(
      `user?page=${page}&limit=10&search=${search}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    return {
      props: {
        data: result.data.data,
        pagination: result.data.pagination,
        sort,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination:
          error.response?.status === 403
            ? "/auth/login"
            : `/error?msg=${error.response?.data.msg}`,
        permanent: false,
      },
    };
  }
}

export default function Transfer(props) {
  const router = useRouter();

  const users = props.data;
  const pagination = props.pagination;
  const sort = props.sort;

  const userData = useSelector((state) => state.user.data);

  const [selectedReceiver, setReceiver] = useState({});
  const [formTransfer, setFormTransfer] = useState({
    receiverId: "",
    amount: 0,
    notes: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [search, setSearch] = useState("");
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const transferDetails = [
    { name: "Amount", value: currency.format(formTransfer.amount) },
    {
      name: "Balance Left",
      value: currency.format(
        isError ? +userData.balance : +userData.balance - +formTransfer.amount
      ),
    },
    { name: "Date & Time", value: date.format(new Date()) },
    { name: "Notes", value: formTransfer.notes },
  ];

  useEffect(() => {
    setReceiver({});
    setIsFormFilled(false);
    setFormTransfer({
      receiverId: "",
      amount: "",
      notes: "",
    });
    setIsConfirmed(false);
    setIsError(false);
    resetPinInput();
  }, []);

  const handleChangeSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(
        `/transfer?page=1${search ? `&search=${search}` : ""}${
          sort ? `&sort=${sort}` : ""
        }`
      );
    }
  };

  const handleSort = (e) => {
    const { value } = e.target;
    router.push(
      `/transfer?page=${pagination.page}${search ? `&search=${search}` : ""}${
        value ? `&sort=${value}` : ""
      }`
    );
  };

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

  const resetPinInput = () => {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
  };

  const handlePinSubmit = async (e) => {
    try {
      e.preventDefault();
      const fullPin =
        pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      await axios.get(`/user/pin?pin=${fullPin}`);
      const result = await axios.post("/transaction/transfer", formTransfer);
      setTransactionId(result.data.data.id);
      setIsError(false);
      setIsConfirmed(true);
      resetPinInput();
    } catch (error) {
      console.log(error);
      if (error.response?.data.msg === "Wrong pin") {
        resetPinInput();
      } else {
        setIsError(true);
        setIsConfirmed(true);
        resetPinInput();
      }
    }
  };

  const handlePdf = async () => {
    try {
      const result = await axios.get(`/export/transaction/${transactionId}`);
      window.open(result.data.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (e) => {
    router.push(
      `/transfer?page=${e.selected + 1}${search ? `&search=${search}` : ""}${
        sort ? `&sort=${sort}` : ""
      }`
    );
  };

  return (
    <Layout title={"Transfer | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 overflow-hidden position-relative">
        {Object.keys(selectedReceiver).length === 0 ? (
          <>
            {/* SELECT RECEIVER */}
            <h2 className="fs-5 fw-bold mb-3">Search Receiver</h2>
            <div className="mb-3 d-flex align-items-start">
              <div className="input-with-icon me-3 w-100">
                <input
                  type="text"
                  className="search-box rounded bg-secondary bg-opacity-25 border-0 ps-5 pe-3 py-2 w-100"
                  placeholder="Search receiver here"
                  value={search}
                  onChange={handleChangeSearchInput}
                  onKeyDown={handleSearch}
                />
                <i className="bi bi-search input-icon opacity-75 ms-2"></i>
              </div>
              <select
                class="form-select bg-secondary bg-opacity-25 border-0 w-25"
                aria-label="sort user"
                onChange={handleSort}
              >
                <option defaultValue={""} value="">
                  -- Sort --
                </option>
                <option value="firstName ASC">Name A-Z</option>
                <option value="firstName DESC">Name Z-A</option>
                <option value="noTelp ASC">Phone Number A-Z</option>
                <option value="noTelp DESC">Phone Number Z-A</option>
              </select>
            </div>
            <div className="scrollable-wrapper p-1" style={{ height: "70%" }}>
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
            <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pagination.totalPage}
                onPageChange={handlePagination}
                containerClassName={"pagination mb-4"}
                pageClassName={"page-item px-1"}
                pageLinkClassName={"page-link rounded"}
                previousClassName={"page-item visually-hidden"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item visually-hidden"}
                nextLinkClassName={"page-link"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                activeLinkClassName={"text-white shadow"}
              />
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
                min={1001}
                max={userData.balance}
                className="transfer__amount-input d-block fs-1 fw-bold border-0 text-primary text-center mb-3 w-50 bg-transparent mx-auto "
                placeholder="0"
                aria-label="amount of money to transfer"
                onChange={handleChangeForm}
                value={formTransfer.amount}
                required
              />
              <p className="fw-bold text-center">
                {currency.format(userData.balance)} Available
              </p>
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
        ) : (
          <>
            {/* TRANSFER SUCCESS */}
            <p className="text-center mb-0">
              {!isError ? (
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
              ) : (
                <i className="bi bi-cross-circle-fill fs-1 text-danger"></i>
              )}
            </p>
            <h2 className="fs-5 fw-bold mb-3 text-center">
              {!isError ? "Transfer Success" : "Transfer Failed"}
            </h2>
            {isError ? (
              <p className="fs-7 opacity-75 text-center">
                We can't transfer your money at the moment, we recommend you to
                check your internet connection and try again.
              </p>
            ) : null}
            <div className="row row-cols-2 mb-2">
              {transferDetails.map((detail, index) => (
                <div key={index} className="col">
                  <div className="mb-3 rounded shadow-sm p-3">
                    <p className="fs-7 opacity-75 mb-1">{detail.name}</p>
                    <p className="fw-bold m-0 text-truncate">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="fs-6 fw-bold mb-3">Transfer to</h3>
            <UserCard data={selectedReceiver} />
            <div className="position-absolute bottom-0 end-0 p-4">
              {!isError ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold px-4 me-2"
                    onClick={handlePdf}
                  >
                    <i className="bi bi-download me-2"></i>
                    Download PDF
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary fw-bold px-4"
                    onClick={() => router.push("/dashboard")}
                  >
                    Back to Dashboard
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary fw-bold px-4"
                  onClick={() => router.push("/transfer")}
                >
                  Try Again
                </button>
              )}
            </div>
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
                <div className="w-50 mx-auto">
                  <PinInput pin={pin} setPin={setPin} />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="submit" className="btn btn-primary px-4">
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
