import React, { FormEvent, useEffect, useState } from "react";
import logo from "../../assets/images/pngegg.png";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import { Button, Toolbar, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import "./Header.css";
import {
  setError,
  signin,
  signout,
  signup,
} from "../../store/action/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Dialog from "@mui/material/Dialog";
import Message from "../message/Message";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

export default function Header() {
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

  const submitHandler2 = (e: FormEvent) => {
    e.preventDefault();
    console.log(firstName);
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  const Login = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
    console.log("Girişyapıldı");
  };

  return (
    <AppBar color="transparent" className="navbar" position="fixed">
      <Toolbar className="navbar-container">
        <div className="navbar-left">
          <img className="logo" src={logo} alt="" />

          <Typography mr={2} variant="h5" className="nav-list-item">
            Ürünler
          </Typography>
          <Typography mr={2} variant="h5" className="nav-list-item">
            Keşfet
          </Typography>
          <Typography mr={2} variant="h5" className="nav-list-item">
            Güvenlik
          </Typography>
          <Typography mr={2} variant="h5" className="nav-list-item">
            Destek
          </Typography>
        </div>

        <div className="navbar-right">
          <Button
            size="large"
            style={{ color: "white", borderColor: "white", marginRight: 30 }}
            startIcon={<LanguageIcon />}
            variant="outlined"
            className="language"
          >
            {" "}
            TÜRKÇE{" "}
          </Button>

          <Button
            onClick={handleClickOpen}
            size="large"
            style={{ color: "white", borderColor: "white", marginRight: 30 }}
            startIcon={<LanguageIcon />}
            variant="outlined"
            className="language"
          >
            {" "}
            Kayıt Ol{" "}
          </Button>

          <Button
            size="large"
            style={{
              color: "white",
              borderColor: "white",
            }}
            startIcon={<LoginIcon />}
            variant="outlined"
            className=""
            onClick={handleClickOpen2}
          >
            {" "}
            OTURUM AÇ{" "}
          </Button>
        </div>

        <Dialog open={open2} onClose={handleClose2}>
          <form onSubmit={Login}>
            {error && <Message msg={error} type="danger" />}
            <DialogTitle>Giriş</DialogTitle>
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
              <Button onClick={handleClose2}>Çıkış Yap</Button>

              <Button type="submit">Giriş</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={submitHandler2}>
            {error && <Message msg={error} type="danger" />}
            <DialogTitle>Kayıt Ol</DialogTitle>
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

              <Button type="submit">Kayıt Ol</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}
