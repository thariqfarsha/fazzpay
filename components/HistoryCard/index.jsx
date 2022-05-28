import React from "react";
import Image from "next/image";

export default function HistoryCard(props) {
  const { fullName, type, image, amount } = props.data;

  return (
    <div className="bg-white mb-3 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="rounded me-3" style={{ width: "48px", height: "48px" }}>
          <Image src={image} alt="profile picture" />
        </div>
        <div>
          <p className="fw-bold mb-1">{fullName}</p>
          <p className="opacity-75 fs-7 m-0">{type}</p>
        </div>
      </div>
      <p
        className={`fw-bold m-0 ${
          type === "Accept" ? "text-success" : "text-danger"
        }`}
      >
        {type === "Accept" ? "+" : "-"}
        {amount}
      </p>
    </div>
  );
}
