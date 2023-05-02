import React from "react";
import { useSelector } from "react-redux";
import "./Acount.css";
import {
  Typography,
  Avatar,
} from "@mui/material";

import { MailOutline, PermIdentity, PhoneAndroid } from "@mui/icons-material";

import WcIcon from "@mui/icons-material/Wc";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

export default function Account() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return (
      <div className="main">
        <div>
          <Typography variant="h3">Profil</Typography>
        </div>

        <div className="card">
          <div className="upper-Container">
            <div className="img-container">
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={user.avatar ? user.avatar : ""}
              />
            </div>
          </div>

          <div className="lover-container">
            <div className="lover-left">
              <div className="itemLover">
                <h3 className="title">Hesap Detayları</h3>
                <div className="item">
                  <PermIdentity className="profil-show-icon" />
                  <h2>{user?.firstName}</h2>
                </div>
                <div className="item">
                  <MailOutline className="profil-show-icon" />
                  <h2>{user?.email}</h2>
                </div>
                <div className="item">
                  <h2>
                    Katıldığım Etkinlik Sayısı {user?.joined_events?.length}
                  </h2>
                </div>
                <div className="item">
                  <h2>
                    Oluşturulan Etkinlik Sayısı {user?.created_events?.length}
                  </h2>
                </div>
              </div>
            </div>
            <div className="lover-right">
              <div className="itemLover">
                <h3 className="title">İletişim Detayları</h3>
                <div className="item">
                  <WcIcon className="profil-show-icon" />
                  <h2>{user.gender}</h2>
                </div>
                <div className="item">
                  <MonitorWeightIcon className="profil-show-icon" />
                  <h2>{user.height}</h2>
                </div>
                <div className="item">
                  <PhoneAndroid className="profil-show-icon" />
                  <h2>{user.phoneNumber}</h2>
                </div>
                <div className="item">
                  <h2>{user?.address?.location}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Navigate to="/" />;
}
