import { useEffect, useState } from "react";
import firebase from "../../firebase/config";

import "./UserList.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../../components/loader/Loader";
import { User } from "../../store/types";
import FriendBox from "./FriendBox";

export default function UserList() {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);

  const getFriends = () => {
    setLoading(true);

    currentUser?.friends?.map(async (f) => {
      await firebase
        .firestore()
        .collection("users")
        .doc(f.user)
        .get()
        .then((snapshot) => {
          setFriends((oldArr) => [...oldArr, snapshot.data() as User]);
        });
    });

    setLoading(false);
  };

  useEffect(() => {
    getFriends();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Grid yapısı eklenecek ??
  return (
    <div>
      <Typography sx={{ marginBottom: 3 }} variant="h4">
        Arkadaşlarım
      </Typography>
      {friends &&
        friends.map((fr, i) => (
          <FriendBox
            img={fr.avatar}
            key={i}
            username={fr.firstName}
            userId={fr.id}
          />
        ))}
    </div>
  );
}
