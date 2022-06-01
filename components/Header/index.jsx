import React, { useState } from "react";
import Image from "next/image";
import blankProfile from "../../public/profiles/blank.png";
import NotifCard from "../NotifCard";
import { useSelector } from "react-redux";

export default function Header(props) {
  const userData = useSelector((state) => state.user.data);
  const historyNotif = useSelector((state) => state.historyNotif.data);
  const { firstName, lastName, noTelp, image } = userData;

  return (
    <>
      <div className="container-fluid bg-white rounded-bottom shadow py-2 fixed-top">
        <div className="container-lg d-flex justify-content-between align-items-center position-relative">
          <h1 className="h3 fw-bold text-primary m-0">FazzPay</h1>
          <div className="d-flex align-items-center">
            <div className="profile-picture me-3">
              <Image
                src={image ? process.env.URL_CLOUDINARY + image : blankProfile}
                alt="profile picture"
                width={48}
                height={48}
                style={{ borderRadius: "8px" }}
                objectFit="cover"
              />
            </div>
            <div className="me-2">
              <p className="fs-6 fw-bold m-0">{`${firstName} ${lastName}`}</p>
              <p className="fs-7 m-0">{noTelp}</p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn rounded-circle"
                style={{ boxShadow: "none" }}
                onClick={() =>
                  props.isNotifShown
                    ? props.setIsNotifShown(false)
                    : props.setIsNotifShown(true)
                }
              >
                {props.isNotifShown ? (
                  <i className="bi bi-bell-fill text-warning d-block fs-5"></i>
                ) : (
                  <i className="bi bi-bell d-block fs-5"></i>
                )}
              </button>
            </div>
          </div>
          {props.isNotifShown ? (
            <div
              className="bg-light rounded shadow-lg p-4 position-absolute"
              style={{
                top: "130%",
                right: "2%",
                width: "30%",
                height: "360px",
                zIndex: 3,
              }}
            >
              <div className="scrollable-wrapper overflow-auto h-100">
                {historyNotif.map((notif, index) => (
                  <div key={index}>
                    <NotifCard notif={notif} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
