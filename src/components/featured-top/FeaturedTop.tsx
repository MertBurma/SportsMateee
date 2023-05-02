import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Carousel from "react-material-ui-carousel";

import "./FeaturedTop.css";
import image1 from "../../assets/images/Neden-Spor-Salonuna-Gitmiyoruz2.jpg";
import image2 from "../../assets/images/Neden-Spor-Salonuna-Gitmiyoruz.jpg";
import image3 from "../../assets/images/dwayne-johnson-workout-new-1920x1200.jpeg";
import image4 from "../../assets/images/girl-fitness-model-pic-1920x1080.jpeg"
import { Box, Button, Typography } from "@mui/material";

interface ItemProps {
  image: string;
}

function FeaturedItem(props: ItemProps) {
  const { image } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="featured">
      <img
        width="100%"
        height="100%"
        className="background-container"
        src={image}
        alt=""
      />

      <Box className="info">
        <Typography className="desc-text">ARKADAŞINI BUL</Typography>

        <Button
          size="large"
          variant="contained"
          onClick={handleClickOpen}
          className="register-button"
        >
          GİRİŞ YAP
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default function FeaturedTop() {
  const items = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
  ];
  return (
    <Carousel interval={10_000}>
      {items.map((i, index) => (
        <FeaturedItem key={index} image={i.image} />
      ))}
    </Carousel>
  );
}
