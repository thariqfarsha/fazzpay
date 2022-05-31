import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "../components/Layout/MainLayout";
import blankProfile from "../public/profiles/blank.png";
import HistoryCard from "../components/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import currency from "../utils/currency";
import { getUserByIdRedux } from "../store/actions/user";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const histories = [
    {
      id: 1,
      fullName: "Samuel Suhi",
      type: "Accept",
      image: blankProfile,
      amount: 50000,
    },
    {
      id: 2,
      fullName: "Netflix",
      type: "Transfer",
      image: blankProfile,
      amount: 149000,
    },
    {
      id: 3,
      fullName: "Christine Martha",
      type: "Accept",
      image: blankProfile,
      amount: 150000,
    },
    {
      id: 4,
      fullName: "Adobe",
      type: "Transfer",
      image: blankProfile,
      amount: 249000,
    },
  ];

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    await dispatch(getUserByIdRedux(userData.id));
  };

  return (
    <MainLayout title={"Dashboard | FazzPay"}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="rounded shadow bg-primary px-4 py-3 d-flex justify-content-between">
            <div>
              <p className="text-white mb-1">Balance</p>
              <h2 className="text-white fs-2 fw-bold mb-2">
                {currency.format(userData.balance)}
              </h2>
              <p className="text-white fs-7 opacity-75 m-0">
                {userData.noTelp}
              </p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-stretch">
              <button
                type="button"
                className="btn btn-light dashboard__btn-white d-block border text-start px-4 mb-2"
                onClick={() => router.push("/transfer")}
              >
                <i className="bi bi-arrow-up text-white me-2"></i>Transfer
              </button>
              <button
                type="button"
                className="btn btn-light dashboard__btn-white d-block border text-start px-4"
                data-bs-toggle="modal"
                data-bs-target="#topupModal"
              >
                <i className="bi bi-plus-lg text-white me-2"></i>Topup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <div className="bg-white rounded shadow px-4 py-3">
            <div className="row">
              <div className="col px-3">
                <p className="fs-5 text-success mb-1">
                  <i className="bi bi-arrow-down"></i>
                </p>
                <p className="mb-1 fw-semibold">Income</p>
                <p className="fs-5 fw-bold text-success">Rp2.120.000</p>
              </div>
              <div className="col px-3">
                <p className="fs-5 text-danger mb-1">
                  <i className="bi bi-arrow-up"></i>
                </p>
                <p className="mb-1 fw-semibold">Expense</p>
                <p className="fs-5 fw-bold text-danger">Rp1.560.000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="bg-white rounded shadow px-4 py-3">
            <div className="mb-4 d-flex justify-content-between align-items-start">
              <h2 className="fs-5 fw-bold">Transaction History</h2>
              <Link href="/history">
                <a className="text-primary fw-semibold">See all</a>
              </Link>
            </div>
            {histories.map((history) => (
              <div key={history.id}>
                <HistoryCard data={history} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
