import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import axios from "../../utils/axios";
import { getUserByIdRedux } from "../../store/actions/user";

export default function UpdatePhoneNumber() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);
  const { id, noTelp } = userData;

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formPhoneNumber, setFormPhoneNumber] = useState({
    noTelp: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const getUserById = async () => {
    await dispatch(getUserByIdRedux(userData.id));
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormPhoneNumber({ ...formPhoneNumber, [name]: value });
  };

  const handleUpdateNumber = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await axios.patch(`/user/profile/${id}`, formPhoneNumber);
      setFormPhoneNumber({ noTelp: "" });
      setIsLoading(false);
      setIsError(false);
      setMessage("Your phone number is updated");
      getUserById();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <MainLayout title={`${noTelp ? "Update" : "Add"} Phone Number | FazzPay`}>
      <div className="bg-white rounded shadow p-4 h-100 d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <button className="btn px-1 py-0 me-2" onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">{`${
            noTelp ? "Update" : "Add"
          } Phone Number`}</h2>
        </div>
        <p className="opacity-50 profile-text">
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
        </p>
        <form
          className="profile-form mx-auto flex-grow-1 d-flex flex-column justify-content-between justify-content-md-center"
          onSubmit={handleUpdateNumber}
        >
          <div>
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
              <i className="bi bi-telephone input-icon text-secondary"></i>
              <label htmlFor="noTelp" className="form-label visually-hidden">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control fw-bold"
                id="noTelp"
                name="noTelp"
                placeholder="08XXXXXXXXXX"
                value={formPhoneNumber.noTelp}
                onChange={handleChangeForm}
                autoComplete="off"
                minLength={11}
                maxLength={13}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary fw-bold mt-3 w-100"
            disabled={!formPhoneNumber.noTelp}
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              `${noTelp ? "Update" : "Add"} Phone Number`
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
