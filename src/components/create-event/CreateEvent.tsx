import React, { useContext, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button, TextField } from "@mui/material";
import "./CreateEvent.css";

export default function CreateEvent(props: any) {


  const [docId, setDocId] = useState();
  const [events, setevents] = useState({});

  const [eventName, setEventName] = useState();
  const [eventDesc, setEventDesc] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState();

  return (
    <div className="Event">
      <h1 className="popupTitle"> Etkinlik Oluştur</h1>
      <div className="inputWrapper">
        <div className="inputsLeft">
          <div className="input">
            <TextField
              onChange={(e: any) => setEventName(e.target.value)}
              id="outlined-basic"
              label="Etkinlik Adı"
              variant="outlined"
            />
          </div>
          <div className="input">
            <TextField
              onChange={(e: any) => setType(e.target.value)}
              id="outlined-basic"
              label="Etkinlik Türü"
              variant="outlined"
            />
          </div>
        </div>
        <div className="input">
          <TextField
            onChange={(e: any) => setEventDesc(e.target.value)}
            multiline
            rows={4}
            defaultValue="Etkinlik Açıklaması "
            id="outlined-multiline-static"
            variant="outlined"
          />
        </div>
        <div className="inputsRight">
          <div className="input">
            <TextField
              InputProps={{
                readOnly: true,
              }}
              id="outlined-read-only-input"
              label="Etkinlik Zamanı"
              variant="outlined"
              defaultValue="Tarih"
            />
          </div>
          <div className="input">
            <TextField
              onChange={(e: any) => setPrice(e.target.value)}
              id="outlined-basic"
              label="Ücret"
              variant="outlined"
            />
          </div>
          <div className="buttons">
            <Button
              onClick={undefined}
              className="paylaş"
              variant="contained"
            >
              {" "}
              Paylaş
            </Button>

            <div className="kapat">
              <Button
                className="kapat"
                onClick={() => props.closeModal(false)}
                variant="outlined"
                color="error"
              >
                Kapat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
