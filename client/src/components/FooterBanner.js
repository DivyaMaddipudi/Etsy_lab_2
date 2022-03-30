import React, { useEffect, useState } from "react";
import CurrencyModal from "./CurrencyModal";

function FooterBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="main-footer">
      <div className="container_currency">
        <div className="footer-middle">
          <div className="row">
            <div className="col-sm-6">
              <button
                className="button"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Currency
              </button>
            </div>
            <div className="col-sm-2">@2022 Etsy'Inc</div>
            <div className="col-sm-2">Terms of Use</div>
            <div className="col-sm-2">Privacy Settings</div>
          </div>
        </div>
      </div>
      {modalOpen && <CurrencyModal setOpenModal={setModalOpen} />}
    </div>
  );
}

export default FooterBanner;
