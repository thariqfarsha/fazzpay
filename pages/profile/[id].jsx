import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../components/Layout/MainLayout";

export default function PersonalInformation() {
  const router = useRouter();
  const userId = router.query.id;
  const userData = {
    id: 7,
    firstName: "Robert",
    lastName: "Chandler",
    email: "pewdiepie1@gmail.com",
    noTelp: "+6281393877946",
  };

  const personalInfos = [
    { name: "First Name", value: userData.firstName },
    { name: "Last Name", value: userData.lastName },
    { name: "Verified Email", value: userData.email },
  ];

  return (
    <MainLayout title={"Personal Information | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <h2 className="fs-5 fw-bold mb-3">Personal Information</h2>
        <p className="opacity-50">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>
        {personalInfos.map((info, index) => (
          <div className="rounded shadow-sm p-3 mb-2" key={index}>
            <p className="opacity-75 fs-7 mb-1">{info.name}</p>
            <p className="fw-bold m-0">{info.value}</p>
          </div>
        ))}
        <div className="rounded shadow-sm p-3 mb-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="opacity-75 fs-7 mb-1">Phone Number</p>
            <p className="fw-bold m-0">{userData.noTelp}</p>
          </div>
          <Link href="/profile/manage-phone-number">
            <a className="fs-7 text-primary">Manage</a>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
