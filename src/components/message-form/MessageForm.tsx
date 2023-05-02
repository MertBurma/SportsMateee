import React from "react";
import "./MessageForm.css";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface FormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
export default function MessageForm(props: FormProps) {
  const { handleSubmit, text, setText } = props;

  return (
    <Box component="form" className="message-form" onSubmit={handleSubmit}>
      <div>
        <TextField
          multiline
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          type="text"
          placeholder="Mesaj Girin"
        />
      </div>

      <div>
        <Button
          className="btn"
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Gönder
        </Button>
      </div>
    </Box>
  );
}
