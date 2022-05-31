import React from "react";
import Image from "next/image";
import blankProfile from "../../public/profiles/blank.png";
import MainLayout from "../../components/Layout/MainLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Profile() {
  const router = useRouter();

  const userData = useSelector((state) => state.user.data);
  const { firstName, lastName, image, noTelp } = userData;

  const profileMenus = [
    { name: "Personal Information", destination: `/profile/personal-info` },
    { name: "Change Password", destination: "/profile/change-password" },
    { name: "Change PIN", destination: "/profile/change-pin" },
  ];

  const handleLogout = () => {
    return;
  };

  return (
    <MainLayout title={"Profile | FazzPay"}>
      <div className="bg-white rounded shadow p-5 h-100 d-flex flex-column justify-content-center align-items-center">
        <div
          className="d-inline-block mb-2"
          style={{ width: "56px", height: "56px", borderRadius: "10px" }}
        >
          <Image
            src={image ? process.env.URL_CLOUDINARY + image : blankProfile}
            alt="profile picture"
            width={56}
            height={56}
          />
        </div>
        <button className="btn py-0">
          <i className="bi bi-pen opacity-75 fs-7 me-2"></i>
          Edit
        </button>
        <h2 className="fs-4 fw-bold mt-3">{`${firstName} ${lastName}`}</h2>
        <p className="opacity-75 mb-4">{noTelp}</p>
        {profileMenus.map((menu, index) => (
          <button
            className="btn px-3 py-2 mb-2 rounded bg-secondary bg-opacity-25 w-50 d-flex justify-content-between align-items-center"
            key={index}
            onClick={() => router.push(menu.destination)}
          >
            <span className="fw-bold">{menu.name}</span>
            <i className="bi bi-arrow-right fs-4 opacity-75"></i>
          </button>
        ))}
        <button
          className="btn px-3 mb-2 rounded bg-secondary bg-opacity-25 w-50 d-flex justify-content-between align-items-center"
          onClick={handleLogout}
        >
          <span className="fw-bold">Logout</span>
          <i className="bi bi-arrow-right fs-4 opacity-0"></i>
        </button>
      </div>
    </MainLayout>
  );
}
