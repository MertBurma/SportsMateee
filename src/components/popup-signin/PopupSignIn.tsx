import React, { useContext } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./PopupSignIn.css";

import GoogleIcon from "@mui/icons-material/Google";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button, TextField } from "@mui/material";

function PopupSignIn() {
  return (
    <div className="modal">
      <div className="overlay">
        <TextField/>
        <div>
          <Button
            onClick={undefined}
            sx={{ width: 200, marginLeft: 15 }}
            variant="contained"
            startIcon={<GoogleIcon />}
          >
            Google İle Giriş
          </Button>
          <Button
            onClick={undefined}
            sx={{ width: 200, marginLeft: 15 }}
            variant="contained"
            startIcon={<LocalPhoneIcon />}
          >
            Telefon Numarası İle Giriş
          </Button>
          <Button
            onClick={undefined}
            sx={{ width: 200, marginLeft: 15 }}
            variant="contained"
            startIcon={<GitHubIcon />}
          >
            Github ile Giriş
          </Button>
          <Button
            onClick={undefined}
            sx={{ width: 200, marginLeft: 15 }}
            variant="contained"
            startIcon={<FacebookIcon />}
          >
            Facebook ile Giriş
          </Button>
        </div>

        <div className="">
          <Button
            sx={{ width: 200, marginLeft: 15, marginTop: 15 }}

            variant="outlined"
            color="error"
          >
            <ExitToAppIcon /> Kapat
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopupSignIn;
