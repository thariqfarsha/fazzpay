import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const [selectedMenu, setMenu] = useState(router.asPath);
  const menus = [
    { name: "Dashboard", icon: "grid", destination: "/home" },
    { name: "Transfer", icon: "arrow-up", destination: "/transfer" },
    { name: "Topup", icon: "plus-lg", destination: "/topup" },
    { name: "Profile", icon: "person", destination: "/profile" },
  ];

  const handleClickMenu = (menu) => {
    setMenu(menu.destination);
    router.push(menu.destination);
  };

  const handleLogout = () => {
    return;
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
            data-bs-toggle={menu.destination === "/topup" ? "modal" : ""}
            data-bs-target={menu.destination === "/topup" ? "#topupModal" : ""}
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
