import React from "react";
import "./Main.css";
import "../../App.css";
import Header from "../header/Header";
import FeaturedTop from "../featured-top/FeaturedTop";

export default function Main() {
  return (
    <div className="main">
      <section className="one">
        <Header />
        <FeaturedTop />
      </section>
    </div>
  );
}
