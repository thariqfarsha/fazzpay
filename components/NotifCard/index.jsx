import React from "react";

export default function NotifCard() {
  return (
    <div className="bg-white rounded shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="me-3">
          <i className="bi bi-arrow-up text-danger fs-4 lh-base align-middle"></i>
        </div>
        <div>
          <p className="opacity-75 fs-7 m-0">Transfer</p>
          <p className="fw-bold m-0">20000</p>
        </div>
      </div>
    </div>
  );
}
