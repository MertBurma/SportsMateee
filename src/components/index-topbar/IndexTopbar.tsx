import "./IndexTopbar.css";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { signout } from "../../store/action/authActions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import firebase from "../../firebase/config";
import { REQUEST_TYPES } from "../../store/types";
import { useNavigate } from "react-router-dom";
export default function IndexTopbar() {
  const dispatch = useDispatch();
  const { user: LoginUser } = useSelector((state: RootState) => state.auth);
  const [popUp, setPopUp] = useState(false);
  const ref = firebase.firestore().collection("users");
  const navigate = useNavigate();

  //notiye tıklayınca bildirimler 0lansın diye
  const ClickPopUp = () => {
    setPopUp(true);
    ref.doc(LoginUser.id).update({
      notifications: 0,
    });
  };

  const logoutClickHandler = () => {
    dispatch(signout());
  };
  const AcceptRequestFriend = (user) => {
    //isteği alan ve isteği kabul eden  elemanın db ye kaydetmek için
    ref.doc(LoginUser.id).update({
      friends: firebase.firestore.FieldValue.arrayUnion({
        user: user.user,
        name: user.name,
      }),
    });
    //isteği atan elemanın db ye kaydetmek için
    ref.doc(user.user).update({
      friends: firebase.firestore.FieldValue.arrayUnion({
        user: LoginUser.id,
        name: LoginUser.firstName,
      }),
    });

    // friends request isAccepted ayarla
    LoginUser?.friendsRequest?.forEach((req) => {
      if (req.isAccepted === REQUEST_TYPES.PENDING && req.user === user.user) {
        req.isAccepted = REQUEST_TYPES.ACCEPTED;
      }
    });

    ref.doc(LoginUser.id).update({
      friendsRequest: LoginUser.friendsRequest,
    });

    navigate("/friends");
  };

  return (
    <AppBar position="sticky" className="topbar">
      <div className="topbar-wrapper">
        <Typography
          sx={{ fontWeight: 500, color: "darkblue", cursor: "pointer" }}
          variant="h4"
        >
          Sportsmate
        </Typography>

        <div className="topbar-right">
          <div className="bildirimDiv" onClick={ClickPopUp}>
            <NotificationsActiveIcon className="bildirim" />
            <h3 className="bildirimSayı">{LoginUser?.notifications}</h3>
          </div>
          {popUp && (
            <Dialog open={popUp} onClose={() => setPopUp(false)}>
              <DialogTitle>
                <b>Arkadaş Ekleme İstekleri</b>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {LoginUser?.friendsRequest?.map((friend, i) => {
                    return (
                      friend.isAccepted === REQUEST_TYPES.PENDING && (
                        <div>
                          <Box
                            sx={{ width: 250 }}
                            borderRadius={2}
                            boxShadow={3}
                            className="single-user-list"
                          >
                            <div className="user-list-left">
                              <Avatar />
                              <Typography
                                sx={{ marginLeft: 2 }}
                                variant="body2"
                              >
                                {friend.name}
                              </Typography>
                            </div>

                            <div className="user-list-right">
                              <div
                                key={i}
                                onClick={() => AcceptRequestFriend(friend)}
                              >
                                <IconButton color="success">
                                  <CheckIcon />
                                </IconButton>
                              </div>

                              <IconButton color="error">
                                <BlockIcon />
                              </IconButton>
                            </div>
                          </Box>
                        </div>
                      )
                    );
                  })}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          )}

          <Button
            color="error"
            variant="contained"
            onClick={logoutClickHandler}
          >
            Çıkış
          </Button>

          <Avatar className="user-img" src={LoginUser?.avatar} />
        </div>
      </div>
    </AppBar>
  );
}
