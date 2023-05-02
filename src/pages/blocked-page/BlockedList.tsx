import { useEffect, useState } from "react";
import firebase from "../../firebase/config";

import "./BlockedList.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../../components/loader/Loader";
import { User } from "../../store/types";
import BlockedBox from "./BlockedBox";

export default function BlockedList() {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState<User[]>([]);

  const getFriends = () => {
    setLoading(true);

    currentUser?.blocked?.map(async (f) => {
      await firebase
        .firestore()
        .collection("users")
        .doc(f.user)
        .get()
        .then((snapshot) => {
          setBlocked((oldArr) => [...oldArr, snapshot.data() as User]);
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
        Engellenenler
      </Typography>
      {blocked &&
        blocked.map((fr, i) => <BlockedBox key={i} username={"mert"} />)}
    </div>
  );
}
