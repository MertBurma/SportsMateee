import React, { Fragment, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import { useSelector } from "react-redux";
import Topbar from "../../components/index-topbar/IndexTopbar";
import IndexSidebar from "../../components/index-sidebar/IndexSidebar";
import User from "../../components/user/User";
import "./Chat.css";
import MessageForm from "../../components/message-form/MessageForm";
import Message from "../../components/chat-messages/ChatMessages";
import { RootState } from "../../store";
import { MessageType, User as UserType } from "../../store/types";
import { Box, Divider, Paper, Typography } from "@mui/material";
import IndexTopbar from "../../components/index-topbar/IndexTopbar";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<UserType[]>([]);
  const [chat, setChat] = useState<typeof user>();
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<MessageType[]>([]);

  useEffect(() => {
    user?.friends?.map(async (f: any) => {
      await firebase
        .firestore()
        .collection("users")
        .doc(f.user)
        .get()
        .then((snapshot) => {
          setUsers((oldArr) => [...oldArr, snapshot.data() as UserType]);
        });
    });
  }, [user]);

  const selectUser = (friend: typeof user) => {
    setChat(friend);

    const currentUser = user!.id;
    const messageUser = friend!.id;
    const id =
      currentUser > messageUser
        ? `${currentUser + messageUser}`
        : `${messageUser + currentUser}`;

    const msgsRef = firebase
      .firestore()
      .collection(`messages/chat/${id}`)
      .orderBy("createdAt");
    msgsRef.onSnapshot((querySnapshot) => {
      const items: MessageType[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as MessageType);
      });
      setMsgs(items);
    });
    console.log(msgs.map((m) => console.log(m)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = user!.id;
    const friendUser = chat!.id;
    const id =
      currentUser > friendUser
        ? `${currentUser + friendUser}`
        : `${friendUser + currentUser}`;
    if (/\S/.test(text)) {
      await firebase.firestore().collection(`messages/chat/${id}`).add({
        text,
        from: currentUser,
        to: friendUser,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setText("");
  };

  return (
    <div className="chat-container">
      <div className="user-selection">
        {users.map((u, i) => (
          <User user={u} key={"user" + i} selectUser={selectUser} />
        ))}
      </div>
      <div className="message-container">
        {chat ? (
          <Fragment>
            <div className="messages-user">
              <Typography variant="h3">{chat.firstName}</Typography>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs?.map((msg, i) => (
                    <Message
                      key={"message" + i}
                      text={msg.text !== "" && msg.text}
                      from={msg.from}
                    />
                  ))
                : ""}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </Fragment>
        ) : (
          <Typography>Select a user to start chat </Typography>
        )}
      </div>
    </div>
  );
}
