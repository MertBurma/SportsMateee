import { FC } from "react";
import { CircularProgress } from "@mui/material";

import "./Loader.css";
const Loader: FC = () => {
  return (
    // <div className="loader-wrapper">
    //   <div className="custom-loader"> </div>
    // </div>

    <div className="loader-wrapper">
      <CircularProgress
        thickness={1.5}
        color="primary"
        variant="indeterminate"
        size={100}
      />
    </div>
  );
};

export default Loader;
