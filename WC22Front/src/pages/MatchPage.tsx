import React, { useState } from "react";
import "../styles/MatchPage.scss";
import { charsData } from "../Components/MatchPage/chars";

export default function MatchPage() {
  const match = {
    date: "11 - 06 - 2022",
    time: "10:30 GMT",
    team1: "Gon",
    team2: "Hisoka",
    refrees: ["Keenan Crane", "Yalla Negro", "Amin Elhassan"],
  };
  const stadium = {
    name: "Stadium 1",
    image: "",
    width: 20,
    height: 10,
    reservedSeats: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
      { x: 15, y: 6 },
      { x: 0, y: 7 },
      { x: 1, y: 8 },
    ]
  };

  const [pageState, setPageState] = useState<"guest" | "watcher" | "manager-viewing" | "manager-editing">("watcher");
  const [selectedSeat, setSelectedSeat] = useState<{ x: number, y: number } | null>(null);

  // skip endline in template literals
  // `hello \
  // world`
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
        {/* Create a grid of seats with reserved seats of stadium, with labels for rows and columns*/}
        <div className="match-page__match__stadium">
          <div className="match-page__match__stadium__header"> Stadium </div>
          <div className="match-page__match__stadium__name"> {stadium.name} </div>
          <div className="match-page__match__stadium__grid">
            {Array.from(Array(stadium.height).keys()).map((y) => {
              return (
                <div className="match-page__match__stadium__grid__row">
                  {Array.from(Array(stadium.width).keys()).map((x) => {
                    return (
                      <>
                      {x == 0 && <div className={`match-page__match__stadium__grid__row__label${selectedSeat?.y === y? "--selected" : ""}`}>{/* as a char */String.fromCharCode(65 + y)}</div>}
                      <div className={`match-page__match__stadium__grid__row__seat`
                      + `${stadium.reservedSeats.find((seat) => seat.x === x && seat.y === y) ? "--reserved" : ""}`
                      + `${selectedSeat?.x === x && selectedSeat?.y === y ? "--selected" : ""}`}
                        onClick={() => {
                          if (stadium.reservedSeats.find((seat) => seat.x === x && seat.y === y)) return;
                          if (selectedSeat?.x === x && selectedSeat?.y === y) setSelectedSeat(null);
                          else setSelectedSeat({ x, y });
                        }}
                      >
                        {y == 0 && <div className={`match-page__match__stadium__grid__row__seat__above-label${selectedSeat?.x === x? "--selected" : ""}`}>{x + 1}</div>}
                      </div>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="match-page__match__stadium__button-container">
            {selectedSeat && <div className="match-page__match__stadium__button-containerselected-seat"> Selected Seat: {selectedSeat.x + 1}, {String.fromCharCode(65 + selectedSeat.y)} </div>}
            <button className={`match-page__match__stadium__button-container__button${!selectedSeat ? "--disabled" : ""}`} disabled={!selectedSeat}> Reserve Seat </button>
          </div>

        </div>
      </div>
    </div>
  );
}
