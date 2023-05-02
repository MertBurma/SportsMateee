import { Fragment, useEffect, useRef } from "react";
import "./Messages.css";
import { useSelector } from "react-redux";
import { MessageType } from "../../store/types";
import { RootState } from "../../store";
import { Box, Typography } from "@mui/material";

const ChatMessages = (props: MessageType) => {
  const { text, from } = props;
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box className={`message-wrapper ${from === user.id ? "own" : ""}`}>
      <Typography paragraph className={from === user.id ? "me" : "friend"}>{text}</Typography>
    </Box>
  );
};

export default ChatMessages;
