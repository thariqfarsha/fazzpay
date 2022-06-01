import React from "react";
import Image from "next/image";
import blankProfile from "../../public/profiles/blank.png";
import currency from "../../utils/currency";
import { useRouter } from "next/router";

export default function HistoryCard(props) {
  const router = useRouter();
  const path = router.asPath;

  const { firstName, fullName, type, image, amount } = props.data;

  return (
    <div className="bg-white mb-4 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="rounded me-3" style={{ width: "48px", height: "48px" }}>
          <Image
            src={image ? process.env.URL_CLOUDINARY + image : blankProfile}
            alt="profile picture"
            width={48}
            height={48}
            objectFit="cover"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div>
          <p className="fw-bold mb-1 text-truncate">
            {path === "/dashboard" ? firstName : fullName}
          </p>
          <p className="opacity-75 fs-7 m-0">{type}</p>
        </div>
      </div>
      <p
        className={`fw-bold m-0 ${
          type === "accept" || type === "topup" ? "text-success" : "text-danger"
        }`}
      >
        {type === "accept" || type === "topup" ? "+" : "-"}
        {currency.format(amount)}
      </p>
    </div>
  );
}
