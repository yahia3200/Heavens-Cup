import React from "react";
import "../styles/MatchPage.scss";
import { charsData } from "../Components/MatchPage/chars";

export default function MatchPage() {
  const match = {
    date: "11 - 06 - 2022",
    time: "10:30 GMT",
    team1: "Hisoka",
    team2: "Kurapika",
    refrees: ["Keenan Crane", "Yalla Negro", "Amin Elhassan"],
    stadium: "awgwa",
  };

  return (
    <div className="match-page">
      <div className="match-page__overlay-image">
      </div>
      <div className="match-page__overlay">
      </div>
      <div className="match-page__match">
        <div className="match-page__match__date-and-time-container">
          <div className="match-page__match__date-and-time-container__date">{match.date}</div>
          <div className="match-page__match__date-and-time-container__time">{match.time}</div>
        </div>
        <div className="match-page__match__teams">
          <div className="match-page__match__teams__team" style={{filter: `hue-rotate(${charsData.get(match.team1)!["hue-rotate"]})`}}>
            <div className="match-page__match__teams__team__flag">
              <img src={ charsData.get(match.team1)!.image } className="match-page__match__teams__team__flag__img"  style={{filter: `hue-rotate(-${charsData.get(match.team1)!["hue-rotate"]})`}} />
            </div>
            <div className="match-page__match__teams__team__name match-page__match__teams__team__name--team-1">{charsData.get(match.team1)!.name}</div>
          </div>
          <div className="match-page__match__teams__team" style={{filter: `hue-rotate(${charsData.get(match.team2)!["hue-rotate"]})`}}>
            <div className="match-page__match__teams__team__name match-page__match__teams__team__name--team-2">{charsData.get(match.team2)!.name}</div>
            <div className="match-page__match__teams__team__flag">
              <img src={charsData.get(match.team2)!.image} className="match-page__match__teams__team__flag__img"  style={{filter: `hue-rotate(-${charsData.get(match.team2)!["hue-rotate"]})`}} />
            </div>
          </div>
        </div>
        <div className="match-page__match__refrees">
            <div className="match-page__match__refrees__header"> Refrees </div>
            <div className="match-page__match__refrees__primary-refree"> {match.refrees[0]} </div>
            <div className="match-page__match__refrees__secondary-refree"> {match.refrees[1]} </div>
            <div className="match-page__match__refrees__secondary-refree"> {match.refrees[2]} </div>
        </div>
      </div>
    </div>
  );
}
