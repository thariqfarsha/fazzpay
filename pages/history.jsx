import React from "react";
import Layout from "../components/Layout/MainLayout";
import blankProfile from "../public/profiles/blank.png";
import HistoryCard from "../components/HistoryCard";

export default function History() {
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
    {
      id: 5,
      fullName: "Netflix",
      type: "Transfer",
      image: blankProfile,
      amount: 149000,
    },
    {
      id: 6,
      fullName: "Christine Martha",
      type: "Accept",
      image: blankProfile,
      amount: 150000,
    },
    {
      id: 7,
      fullName: "Adobe",
      type: "Transfer",
      image: blankProfile,
      amount: 249000,
    },
    {
      id: 5,
      fullName: "Netflix",
      type: "Transfer",
      image: blankProfile,
      amount: 149000,
    },
    {
      id: 6,
      fullName: "Christine Martha",
      type: "Accept",
      image: blankProfile,
      amount: 150000,
    },
    {
      id: 7,
      fullName: "Adobe",
      type: "Transfer",
      image: blankProfile,
      amount: 249000,
    },
  ];

  return (
    <Layout title={"Transaction History | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 overflow-hidden">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fs-5 fw-bold">Transaction History</h2>
          <select
            className="form-select bg-secondary bg-opacity-25 border-0 w-25"
            aria-label="transaction history filter"
          >
            <option defaultValue={""}>-- Select Filter --</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="card-wrapper" style={{ height: "85%" }}>
          {histories.map((history) => (
            <div className="mb-4" key={history.id}>
              <HistoryCard data={history} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
