import "./Main.css";
import "../../App.css";
import Header from "../../components/header/Header";
import FeaturedTop from "../../components/featured-top/FeaturedTop";
import { Fragment } from "react";

export default function Main() {
  return (
    <Fragment>
      <Header />
      <FeaturedTop />
    </Fragment>
  );
}
