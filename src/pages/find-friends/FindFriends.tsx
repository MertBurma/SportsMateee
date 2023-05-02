import "./FindFriends.css";
import Button from "@mui/material/Button";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { REQUEST_TYPES, User } from "../../store/types";
import firebase from "../../firebase/config";
import FriendBox from "../user-list/FriendBox";
import {
  Avatar,
  Box,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { doc } from "firebase/firestore";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const key = process.env.REACT_APP_MAPBOX_TOKEN;

export default function FindFriends() {
  if (!key) {
    throw new Error("map key is missing...");
  }

  const [friendCand, setFriendCand] = useState<User[]>([]);
  const { user: LoginUser } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const ref = firebase.firestore().collection("users");
  const [popUp, setPopUp] = useState(false);
  const [progress, setProgress] = React.useState(10);
  const [success, setSuccess] = React.useState(false);
  const [count, setCount] = useState(0);
  const [distance, setDistance] = useState(0);

  const calculateDistance = (
    coordinatesUser: typeof LoginUser.address.coordinates,
    coordinatesFriend: typeof LoginUser.address.coordinates
  ) => {
    console.log(coordinatesFriend, " <-----> ", coordinatesUser);
    const earthRadius = 6378.137;
    const o1 = (coordinatesUser.ltd * Math.PI) / 180;
    console.log(o1, coordinatesFriend);
    const o2 = (coordinatesFriend.ltd * Math.PI) / 180;
    const deltaO =
      ((coordinatesFriend.ltd - coordinatesUser.ltd) * Math.PI) / 180;
    const deltaL =
      ((coordinatesFriend.lng - coordinatesUser.lng) * Math.PI) / 180;

    const a =
      Math.pow(Math.sin(deltaO / 2), 2) +
      Math.cos(o1) * Math.cos(o2) * Math.pow(Math.sin(deltaL / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    setDistance(d);
    console.log(d);
  };
  function ClosePopUp() {
    setPopUp(false);
    setCount(0);
  }

  function ShowResult() {
    setSuccess(false);
  }

  function calculate(user) {
    calculateDistance(LoginUser.address.coordinates, user.address.coordinates);
    CalculatePoint(user);
  }

  function CalculatePoint(user) {
    setSuccess(true);

    setPopUp(true);
    LoginUser?.answer?.forEach((req) => {
      user?.answer?.forEach((req2) => {
        if (req.question1 === req2.question1) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question2 === req2.question2) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question3 === req2.question3) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question4 === req2.question4) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question5 === req2.question5) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question6 === req2.question6) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question7 === req2.question7) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question8 === req2.question8) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question9 === req2.question9) {
          setCount((oldVal) => oldVal + 10);
        }
        if (req.question10 === req2.question10) {
          setCount((oldVal) => oldVal + 10);
        }

        if (distance < 10) {
          setCount((oldVal) => oldVal + 10);
        }
        if (distance > 10) {
          setCount((oldVal) => oldVal - 25);
        }
      });
    });

    console.log(count);
  }
  function addFriend(user) {
    console.log(user);

    //istek gelince noti +1
    ref.doc(user.id).update({
      notifications: firebase.firestore.FieldValue.increment(1),
    });
    // arkadaşlık isteği
    ref.doc(user.id).update({
      friendsRequest: firebase.firestore.FieldValue.arrayUnion({
        user: LoginUser.id,
        name: LoginUser.firstName,
        isAccepted: REQUEST_TYPES.PENDING,
      }),
    });
  }

  function getUsers() {
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (LoginUser.id !== doc.data().id)
          setUsers((us) => [...us, doc.data() as User]);
      });

      // for (let i = 0; i < users.length; i++) {
      //   console.log(users[i]);
      //   for (let j = 0; j < LoginUser.friends.length; j++) {
      //     if (users[i].id === LoginUser.friends[j].user) {
      //       users.filter((us) => us !== users[i]);
      //     }
      //   }
      // }
    });
  }

  React.useEffect(() => {
    getUsers();
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div>
        <div className="container2">
          <div className="others">
            <Typography sx={{ marginBottom: 3 }} variant="h4">
              Arkadaş Bul
            </Typography>
            {users.map((user, id) => (
              <div className="FindFriends">
                <FriendBox
                  img={user.avatar}
                  key={id}
                  username={user.firstName}
                  userId={user.id}
                />

                <Button
                  className="button"
                  onClick={() => addFriend(user)}
                  key={id}
                  variant="contained"
                >
                  Arkadaş Ekle
                </Button>

                <Button
                  className="button"
                  onClick={() => calculate(user)}
                  key={id}
                  variant="contained"
                >
                  Uyumluluk Hesapla
                </Button>
              </div>
            ))}
          </div>
          {popUp && (
            <Dialog open={popUp} onClose={() => setPopUp(false)}>
              <DialogTitle>
                <div className="text">
                  <b>Uyumluluk Oranınız</b>
                </div>
              </DialogTitle>
              <DialogContent>
                {success === true ? (
                  <div className="loading">
                    <CircularProgressWithLabel value={progress} />
                  </div>
                ) : (
                  <div className="result">
                    <h1 className="puan">{count} </h1>
                  </div>
                )}
                <DialogActions>
                  <div className="dadasdsd">
                    <Button className="butonlar" onClick={ShowResult}>
                      Sonuçları Gör
                    </Button>
                    <Link to="/find-friend">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={ClosePopUp}
                      >
                        Çıkış
                      </Button>
                    </Link>
                  </div>
                </DialogActions>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
