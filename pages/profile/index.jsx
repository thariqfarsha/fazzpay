import React, { useEffect, useState } from "react";
import Image from "next/image";
import blankProfile from "../../public/profiles/blank.png";
import MainLayout from "../../components/Layout/MainLayout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logoutRedux } from "../../store/actions/user";
import axios from "../../utils/axios";
import { getUserByIdRedux } from "../../store/actions/user";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);
  const { id, firstName, lastName, image, noTelp } = userData;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formImage, setFormImage] = useState({
    image: null,
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const profileMenus = [
    {
      name: "Personal Information",
      action: () => handleMenu("/profile/personal-info"),
      icon: "arrow-right",
    },
    {
      name: "Change Password",
      action: () => handleMenu("/profile/change-password"),
      icon: "arrow-right",
    },
    {
      name: "Change PIN",
      action: () => handleMenu("/profile/change-pin"),
      icon: "arrow-right",
    },
    { name: "Logout", action: () => handleLogout(), icon: "box-arrow-right" },
  ];

  useEffect(() => {
    setIsError(false);
    setMessage("");
    setSelectedFile(null);
    setPreview(null);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(preview);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  const getUserById = async () => {
    await dispatch(getUserByIdRedux(id));
  };

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setFormImage({ ...formImage, image: e.target.files[0] });
  };

  const handleUpdateImage = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", formImage.image);
      await axios.patch(`/user/image/${id}`, formData);
      setIsError(false);
      setMessage("Image updated");
      getUserById();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const result = await axios.delete(`/user/image/${id}`);
      setIsError(false);
      setMessage(result.data.data.msg);
      getUserById();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleMenu = (destination) => {
    router.push(destination);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutRedux());
      Cookies.remove("token");
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout title={"Profile | FazzPay"}>
      <div className="bg-white rounded shadow p-4 p-md-5 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
        <div
          className="d-inline-block mb-2"
          style={{ width: "56px", height: "56px", borderRadius: "10px" }}
        >
          <Image
            src={image ? process.env.URL_CLOUDINARY + image : blankProfile}
            alt="profile picture"
            width={56}
            height={56}
            objectFit="cover"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <button
          className="btn py-0"
          data-bs-toggle="modal"
          data-bs-target="#editImageModal"
        >
          <i className="bi bi-pen opacity-75 fs-7 me-2"></i>
          Edit
        </button>
        <h2 className="fs-4 fw-bold mt-3">{`${firstName} ${lastName}`}</h2>
        <p className="opacity-75 mb-4">{noTelp}</p>
        {profileMenus.map((menu, index) => (
          <button
            className="profile-menu btn px-3 py-2 mb-2 rounded bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center"
            key={index}
            onClick={menu.action}
          >
            <span className="fw-bold">{menu.name}</span>
            <i className={`bi bi-${menu.icon} fs-4 opacity-75`}></i>
          </button>
        ))}
      </div>

      {/* Edit Profile Image Modal */}
      <div
        className="modal fade"
        id="editImageModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editImageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editImageModalLabel">
                Update Profile Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleUpdateImage}>
              <div className="modal-body text-center">
                <label
                  htmlFor="formFile"
                  className="form-label update-image-input d-inline-block mb-0 position-relative"
                >
                  <Image
                    src={
                      preview
                        ? preview
                        : image
                        ? process.env.URL_CLOUDINARY + image
                        : blankProfile
                    }
                    alt="profile image preview"
                    width={120}
                    height={120}
                    objectFit="cover"
                    style={{ borderRadius: "16px" }}
                  />
                  <div className="update-image__overlay position-absolute top-0 start-0 justify-content-center align-items-center">
                    <span className="text-white fw-semibold align-middle d-block">
                      Upload
                      <br />
                      image
                    </span>
                  </div>
                </label>
                <input
                  className="form-control visually-hidden"
                  type="file"
                  id="formFile"
                  onChange={handleSelectFile}
                />
              </div>
              {message ? (
                isError ? (
                  <p className="text-danger text-center mb-0">{message}</p>
                ) : (
                  <p className="text-success text-center mb-0">{message}</p>
                )
              ) : null}
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-danger px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                >
                  Delete
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="confirmDeleteModalLabel">
                <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Are you sure to delete your profile image?</p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-primary px-4"
                data-bs-toggle="modal"
                data-bs-target="#editImageModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger px-4"
                data-bs-dismiss="modal"
                onClick={handleDeleteImage}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
