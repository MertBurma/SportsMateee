import { Avatar, Box, IconButton, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import "./UserList.css";
import firebase from "../../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface FriendProps {
  img?: string;
  username: string;
  userId: string;
}

export default function FriendBox(props: FriendProps) {
  const { img, username, userId } = props;
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const selectUser = async (username: any) => {
    console.log(username.id);
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser?.id)
      .update({
        blocked: firebase.firestore.FieldValue.arrayUnion({
          name: username,
          ıd: userId,
        }),
      });
  };

  return (
    <Box borderRadius={2} boxShadow={3} className="single-user-list">
      <div className="user-list-left">
        <Avatar src={img ? img : ""} />
        <Typography sx={{ marginLeft: 2 }} variant="body2">
          {username}
        </Typography>
      </div>

      <div className="user-list-right">
        <IconButton color="error">
          <BlockIcon onClick={() => selectUser(username)} />
        </IconButton>
      </div>
    </Box>
  );
}
