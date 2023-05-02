import "./SwipeButton.css";

import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";

export default function SwipeButton() {
  return (
    <div className="swipeButtons">
      <IconButton className="swipteButton_repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipteButton_left">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipteButton_star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipteButton_right">
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButton_lighting">
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
