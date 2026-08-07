import React from "react";
import { Divider } from "../general/divider/Divider";
import "./AccountTabContent.css";

export const AccountTabContent = () => {
  return (
    <div className="tab-content-details">
      <div className="tab-content-fields-wrapper">
        <div className="account-log-out-wrapper account-content-block-wrapper">
          <div className="log-out-text">
            <h2 className="profile-title">Log out</h2>
            <p className="profile-desc">
              Log out of this device. You can sign back in at any time
            </p>
          </div>
          <button className="account-action-btn log-out-btn">Log out</button>
        </div>
        <Divider />

        {/* Deletion */}
        <div className="account-content-block-wrapper">
          <div>
            <h2 className="profile-title">Danger Zone</h2>
            <p className="profile-desc">Irreversible account actions</p>
          </div>

          <div className="deletion-wrapper account-content-block-wrapper">
            <div className="deletion-text-wrapper">
              <h2 className="profile-title delete-header">
                Delete your account
              </h2>
              <div className="delete-desc-text profile-desc">
                <p>
                  Permanently delete your account, including your orders and
                  account data.
                </p>
                <p>This action cannot be undone.</p>
              </div>
            </div>
            <button className="account-delete-btn button-primary account-action-btn">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
