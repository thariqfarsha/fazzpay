import React, { useState } from "react";
import Image from "next/image";
import profile8 from "../../public/profiles/8.png";
import NotifCard from "../NotifCard";

export default function Header(props) {
  return (
    <>
      <div className="container-fluid bg-white rounded-bottom shadow py-2 fixed-top">
        <div className="container-lg d-flex justify-content-between align-items-center position-relative">
          <h1 className="h3 fw-bold text-primary m-0">FazzPay</h1>
          <div className="d-flex align-items-center">
            <div className="profile-picture me-3">
              <Image src={profile8} alt="profile picture" />
            </div>
            <div className="me-2">
              <p className="fs-6 fw-bold m-0">Robert Chandler</p>
              <p className="fs-7 m-0">+62 8139 3877 7946</p>
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
                <i className="bi bi-bell d-block fs-5"></i>
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
              <div className="card-wrapper overflow-auto h-100">
                <NotifCard />
                <NotifCard />
                <NotifCard />
                <NotifCard />
                <NotifCard />
                <NotifCard />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
