import React from "react";
import Image from "next/image";
import blankProfile from "../../public/profiles/blank.png";
import currency from "../../utils/currency";
import { useRouter } from "next/router";

export default function HistoryCard(props) {
  const router = useRouter();
  const path = router.pathname;

  const { firstName, fullName, type, image, amount, status } = props.data;

  return (
    <div className="bg-white mb-4 row justify-content-between align-items-center">
      <div className="col-7">
        <div className="row">
          <div className={path === "/dashboard" ? "col-4" : "col-4 col-md-2"}>
            <div className="rounded" style={{ width: "48px", height: "48px" }}>
              <Image
                src={image ? process.env.URL_CLOUDINARY + image : blankProfile}
                alt="profile picture"
                width={48}
                height={48}
                objectFit="cover"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
          <div className={path === "/dashboard" ? "col-8" : "col-8 col-md-10"}>
            <p className="fw-bold mb-1 text-truncate">
              {path === "/dashboard" ? firstName : fullName}
            </p>
            <p className="opacity-75 fs-7 m-0 text-truncate">
              {type} - {status}
            </p>
          </div>
        </div>
      </div>
      <div className="col-5 text-end">
        <p
          className={`fw-bold m-0 ${
            type === "accept" || type === "topup"
              ? status === "pending"
                ? "text-black-50"
                : "text-success"
              : "text-danger"
          }`}
        >
          {type === "accept" || type === "topup"
            ? status === "pending"
              ? ""
              : "+"
            : "-"}
          {currency.format(amount)}
        </p>
      </div>
    </div>
  );
}
