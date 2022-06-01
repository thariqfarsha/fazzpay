import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import axios from "../../utils/axios";
import { getUserByIdRedux } from "../../store/actions/user";

export default function UpdateProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);
  const { id, firstName, lastName } = userData;

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [formUpdateProfile, setFormUpdateProfile] = useState({
    firstName,
    lastName,
  });

  const getUserById = async () => {
    await dispatch(getUserByIdRedux(userData.id));
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormUpdateProfile({ ...formUpdateProfile, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`/user/profile/${id}`, formUpdateProfile);
      setIsError(false);
      setMessage("Profile updated");
      getUserById();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <MainLayout title={"Update Profile | FazzPay"}>
      <div className="bg-white rounded shadow p-4 h-100">
        <div className="d-flex align-items-center mb-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Update Profile</h2>
        </div>
        <p className="opacity-50 w-50">Update your profile</p>
        <form className="w-50 mx-auto mt-5" onSubmit={handleUpdateProfile}>
          {message ? (
            isError ? (
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            ) : (
              <div className="alert alert-success py-2" role="alert">
                {message}
              </div>
            )
          ) : (
            <div className="mt-4"></div>
          )}
          <div className="input-with-icon mb-3">
            <i className="bi bi-person input-icon text-secondary"></i>
            <label htmlFor="first-name" className="form-label visually-hidden">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              placeholder="First Name"
              value={formUpdateProfile.firstName}
              onChange={handleChangeForm}
            />
          </div>
          <div className="input-with-icon mb-3">
            <i className="bi bi-person input-icon text-secondary"></i>
            <label htmlFor="last-name" className="form-label visually-hidden">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              value={formUpdateProfile.lastName}
              onChange={handleChangeForm}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary fw-bold mt-3 mb-5 w-100"
          >
            Update Profile
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
