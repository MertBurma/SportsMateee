import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import SwipeButton from "../swipe-button/SwipeButton";

export default function Cardss() {
  const [people, setPeople] = useState([
    {
      name: "Mert Burma",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    },
    {
      name: "Mark Zuckerberg",
      url: "https://cdnntr1.img.sputniknews.com/img/07e5/04/1c/1044374521_0:155:3072:1893_1920x0_80_0_0_af4a164260d3566868fb1187ace67167.jpg",
    },
  ]);

  return (
    <div>
      <div className="tinderCards_cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${person.url})` }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
