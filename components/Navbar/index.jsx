import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { logoutRedux } from "../../store/actions/user";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedMenu, setMenu] = useState(router.asPath);
  const menus = [
    { name: "Dashboard", icon: "grid", destination: "/dashboard" },
    { name: "Transfer", icon: "arrow-up", destination: "/transfer" },
    { name: "Topup", icon: "plus-lg", destination: "#" },
    { name: "Profile", icon: "person", destination: "/profile" },
  ];

  const handleClickMenu = (menu) => {
    setMenu(menu.destination);
    router.push(menu.destination);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutRedux());
      Cookies.remove("token");
      localStorage.clear();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded shadow py-3 h-100 d-flex flex-column justify-content-between">
      <div>
        {menus.map((menu) => (
          <button
            className={`btn btn-navbar py-1 my-2 ${
              selectedMenu === menu.destination ? "btn-navbar--selected" : ""
            }`}
            onClick={() => handleClickMenu(menu)}
            key={menu.name}
            data-bs-toggle={menu.name === "Topup" ? "modal" : ""}
            data-bs-target={menu.name === "Topup" ? "#topupModal" : ""}
          >
            <i className={`bi bi-${menu.icon} text-dark me-4`}></i>
            {menu.name}
          </button>
        ))}
      </div>
      <div>
        <button className="btn btn-navbar py-1 my-2" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right text-dark me-4"></i>Logout
        </button>
      </div>
    </div>
  );
}
