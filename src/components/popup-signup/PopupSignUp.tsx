import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, setError, signin } from "../../store/action/authActions";
import { RootState } from "../../store";
import Message from "../../components/message/Message";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const Login = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
    console.log("Girişyapıldı");
  };

  const submitHandler2 = (e: FormEvent) => {
    e.preventDefault();
    console.log(firstName);
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen2}>
        Giriş Yap
      </Button>

      <Dialog open={open2} onClose={handleClose2}>
        <form onSubmit={Login}>
          {error && <Message msg={error} type="danger" />}
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Bilgilerinizi Girin</DialogContentText>

            <TextField
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Cancel</Button>

            <Button type="submit">Subscribe</Button>
          </DialogActions>
          {/* <button onClick={submitHandler2}> Kayıt Ol </button> */}
        </form>
      </Dialog>

      <Button variant="outlined" onClick={handleClickOpen}>
        Kayıt Ol
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={submitHandler2}>
          {error && <Message msg={error} type="danger" />}
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Bilgilerinizi Girin</DialogContentText>

            <TextField
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              margin="dense"
              id="firstName"
              label="Kullanıcı Adı"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button type="submit">Subscribe</Button>
          </DialogActions>
          {/* <button onClick={submitHandler2}> Kayıt Ol </button> */}
        </form>
      </Dialog>
    </div>
  );
}
