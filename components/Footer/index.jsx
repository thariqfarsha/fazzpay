import React from "react";

export default function Footer() {
  return (
    <div className="container-fluid bg-primary fixed-bottom d-none d-md-block">
      <div className="container-lg py-2 d-flex justify-content-between">
        <div>
          <span className="text-white fw-semibold">
            &copy; 2022 FazzPay. All right reserved.
          </span>
        </div>
        <div>
          <span className="text-white fw-semibold me-5">
            +62 5637 8882 9901
          </span>
          <span className="text-white fw-semibold">contact@fazzpay.com</span>
        </div>
      </div>
    </div>
  );
}
