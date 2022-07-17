import React from "react";
import currency from "../../utils/currency";

export default function NotifCard(props) {
  const notif = props.notif;

  return (
    <div className="bg-white rounded shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="me-3 d-flex justify-content-center align-items-center">
          {notif.status === "pending" ? (
            <i className="bi bi-hourglass-split text-black-50 fs-4"></i>
          ) : notif.type === "send" ? (
            <i className="bi bi-arrow-up text-danger fs-4"></i>
          ) : (
            <i className="bi bi-arrow-down text-success fs-4"></i>
          )}
        </div>
        <div>
          <p className="opacity-75 fs-7 m-0">
            {notif.type === "send"
              ? `${notif.type} to ${notif.fullName} - ${notif.status}`
              : notif.type === "accept"
              ? `${notif.type} from ${notif.fullName} - ${notif.status}`
              : `${notif.type} - ${notif.status}`}
          </p>
          <p className="fw-bold m-0">{currency.format(notif.amount)}</p>
        </div>
      </div>
    </div>
  );
}
