import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";

export default function PersonalInformation() {
  const router = useRouter();

  const userData = useSelector((state) => state.user.data);
  const { firstName, lastName, email, noTelp } = userData;

  const personalInfos = [
    {
      name: "First Name",
      value: firstName,
      destination: "/profile/update-profile",
    },
    {
      name: "Last Name",
      value: lastName,
      destination: "/profile/update-profile",
    },
    { name: "Verified Email", value: email, destination: "" },
  ];

  return (
    <MainLayout title={"Personal Information | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100 position-relative">
        <div className="d-flex align-items-center mb-4 mb-md-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Personal Information</h2>
        </div>
        <p className="opacity-50 d-none d-md-block">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>
        {personalInfos.map((info, index) => (
          <div
            className="rounded shadow-sm p-3 mb-2 d-flex justify-content-between align-items-center"
            key={index}
          >
            <div>
              <p className="opacity-75 fs-7 mb-1">{info.name}</p>
              <p className="fw-bold m-0">{info.value}</p>
            </div>
            <div>
              {info.name === "Verified Email" ? null : (
                <Link href={info.destination}>
                  <a className="fs-7 fw-semibold text-primary">Edit</a>
                </Link>
              )}
            </div>
          </div>
        ))}
        <div className="rounded shadow-sm p-3 mb-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="opacity-75 fs-7 mb-1">Phone Number</p>
            {noTelp ? (
              <p className="fw-bold m-0">{noTelp}</p>
            ) : (
              <Link href="/profile/update-phone-number">
                <a className="fs-7 fw-semibold text-primary">
                  Add phone number
                </a>
              </Link>
            )}
          </div>
          {noTelp ? (
            <Link href="/profile/update-phone-number">
              <a className="fs-7 fw-semibold text-primary">Edit</a>
            </Link>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}
