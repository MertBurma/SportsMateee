import { Avatar, Box, Typography } from "@mui/material";
import { User as UserType } from "../../store/types";
import "./User.css";

interface UserProps {
  user: UserType;
  selectUser: (user: UserType) => void;
}

export default function User(props: UserProps) {
  const { selectUser, user } = props;
  return (
    <Box
      boxShadow={3}
      borderRadius={3}
      className="user-wrapper"
      onClick={() => selectUser(user)}
    >
      <div className="user-detail">
        <Avatar src={user.avatar ? user.avatar : ""} />
        <Typography variant="body1">{user.firstName}</Typography>
      </div>
    </Box>
  );
}
