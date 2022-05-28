import React from "react";
import Image from "next/image";
import profile8 from "../../public/profiles/8.png";
import MainLayout from "../../components/Layout/MainLayout";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  const userData = {
    id: 7,
    name: "Robert",
  };

  const profileMenus = [
    { name: "Personal Information", destination: `/profile/${userData.id}` },
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
          <Image src={profile8} alt="profile picture" />
        </div>
        <button className="btn py-0">
          <i className="bi bi-pen opacity-75 fs-7 me-2"></i>
          Edit
        </button>
        <h2 className="fs-4 fw-bold mt-3">Robert Chandler</h2>
        <p className="opacity-75 mb-4">+62 813-9387-7946</p>
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
          className="btn px-3 py-2 mb-2 rounded bg-secondary bg-opacity-25 w-50 d-flex justify-content-between align-items-center"
          onClick={handleLogout}
        >
          <span className="fw-bold">Logout</span>
        </button>
      </div>
    </MainLayout>
  );
}
