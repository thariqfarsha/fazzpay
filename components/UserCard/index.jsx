import React from "react";
import Image from "next/image";
import blankImage from "../../public/profiles/blank.png";

export default function UserCard(props) {
  const { firstName, lastName, noTelp, image } = props.data;

  return (
    <div className="rounded shadow-sm p-3 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="rounded me-3" style={{ width: "48px", height: "48px" }}>
          <Image src={image ? image : blankImage} alt="profile picture" />
        </div>
        <div>
          <p className="fw-bold mb-1">{firstName + " " + lastName}</p>
          <p className="opacity-75 fs-7 m-0">{noTelp}</p>
        </div>
      </div>
    </div>
  );
}
