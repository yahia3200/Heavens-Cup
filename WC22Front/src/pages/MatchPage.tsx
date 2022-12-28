import React, { useState } from "react";
import "../styles/MatchPage.scss";
import {
  chars,
  charsData,
  nenColors,
  NenTypes,
} from "../Components/MatchPage/chars";
import PageHeader from "../Components/PageHeader";

export default function MatchPage() {
  const match = {
    date: "11 - 06 - 2022",
    time: "10:30",
    team1: "Gon",
    team2: "Killua",
    referees: ["Keenan Crane", "Yalla Negro", "Amin Elhassan"],
  };
  const stadium = {
    name: "Heaven's Arena",
    image: "",
    width: 25,
    height: 15,
    reservedSeats: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
      { x: 15, y: 6 },
      { x: 0, y: 7 },
      { x: 1, y: 8 },
    ],
  };

  const [pageState, setPageState] = useState<
    "guest" | "watcher" | "manager-viewing" | "manager-editing"
  >("watcher");
  const [selectedSeat, setSelectedSeat] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // skip endline in template literals
  // `hello \
  // world`
  return (
    <>
      <PageHeader headerText="Match Page" />
      <div className="match-page">
        {/* use the header component
      <div className="match-page__overlay-image">
      </div>
      <div className="match-page__overlay">
      </div> */}
        <div className="match-page__date-and-time-container">
          <div className="match-page__date-and-time-container__date">
            {match.date}
          </div>
          <div className="match-page__date-and-time-container__time">
            {`${match.time} GMT`}
          </div>
        </div>
        <div className="match-page__match">
          <div className="match-page__match__info">
            <div className="match-page__match__info__inner">
              <div className="match-page__match__info__inner__teams">
                <div className="match-page__match__info__inner__teams__image-container">
                  <div
                    className="match-page__match__info__inner__teams__image-container__image-1"
                    style={{
                      filter: `hue-rotate(${
                        charsData.get(match.team1)!["hue-rotate"]
                      })`,
                    }}
                  >
                    <img
                      src={charsData.get(match.team1)!.image}
                      alt=""
                      style={{
                        filter: `hue-rotate(-${
                          charsData.get(match.team1)!["hue-rotate"]
                        })`,
                      }}
                    />
                  </div>
                  <div className="match-page__match__info__inner__teams__image-container__vs">
                    <img src="/src/assets/vs.png" alt="" />
                  </div>
                  <div
                    className="match-page__match__info__inner__teams__image-container__image-2"
                    style={{
                      filter: `hue-rotate(${
                        charsData.get(match.team2)!["hue-rotate"]
                      })`,
                    }}
                  >
                    <img
                      src={charsData.get(match.team2)!.image}
                      alt=""
                      style={{
                        filter: `hue-rotate(-${
                          charsData.get(match.team2)!["hue-rotate"]
                        })`,
                      }}
                    />
                  </div>
                </div>
                <div className="match-page__match__info__inner__teams__team-name">
                  <div className="match-page__match__info__inner__teams__team-name-1">
                    <img
                      src={`/src/assets/${
                        charsData.get(match.team1)!.nen
                      }.webp`}
                      alt=""
                    />
                    <div className="match-page__match__info__inner__teams__team-name-1__name">
                      <div className="match-page__match__info__inner__teams__team-name-1__name__name">
                        {charsData.get(match.team1)!.name}
                      </div>
                      <div
                        className="match-page__match__info__inner__teams__team-name-1__name__nen"
                        style={{
                          color: `${
                            nenColors[
                              NenTypes[charsData.get(match.team1)!.nen!]
                            ]
                          }`,
                        }}
                      >
                        {charsData.get(match.team1)!.nen}
                      </div>
                    </div>
                  </div>
                  <div className="match-page__match__info__inner__teams__team-name-2">
                    <div className="match-page__match__info__inner__teams__team-name-2__name">
                      <div className="match-page__match__info__inner__teams__team-name-2__name__name">
                        {charsData.get(match.team2)!.name}
                      </div>
                      <div
                        className="match-page__match__info__inner__teams__team-name-2__name__nen"
                        style={{
                          color: `${
                            nenColors[
                              NenTypes[charsData.get(match.team2)!.nen!]
                            ]
                          }`,
                        }}
                      >
                        {charsData.get(match.team2)!.nen}
                      </div>
                    </div>
                    <img
                      src={`/src/assets/${
                        charsData.get(match.team2)!.nen
                      }.webp`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="match-page__match__info__inner__referees">
                <div className="match-page__match__info__inner__referees__header">
                  Refrees
                </div>
                <div className="match-page__match__info__inner__referees__primary-referee">
                  {match.referees[0]}
                </div>
                <div className="match-page__match__info__inner__referees__secondary-referee">
                  {match.referees[1]}
                </div>
                <div className="match-page__match__info__inner__referees__secondary-referee">
                  {match.referees[2]}
                </div>
              </div>
            </div>
          </div>
          {/* Create a grid of seats with reserved seats of stadium, with labels for rows and columns*/}
          <div className="match-page__match__stadium">
            <div className="match-page__match__stadium__header"> Stadium </div>
            <div className="match-page__match__stadium__name">
              {stadium.name}
            </div>
            <div className="match-page__match__stadium__grid">
              {Array.from(Array(stadium.height).keys()).map((y) => {
                return (
                  <div className="match-page__match__stadium__grid__row">
                    {Array.from(Array(stadium.width).keys()).map((x) => {
                      return (
                        <>
                          {x == 0 && (
                            <div
                              className={`match-page__match__stadium__grid__row__label${
                                selectedSeat?.y === y ? "--selected" : ""
                              }`}
                            >
                              {/* as a char */ String.fromCharCode(65 + y)}
                            </div>
                          )}
                          <div
                            style={{
                              width: `${
                                10 + Math.ceil(50 / Math.sqrt((Math.max(stadium.width, stadium.height) + 1)))
                              }px`,
                            }}
                            className={
                              `match-page__match__stadium__grid__row__seat` +
                              `${
                                stadium.reservedSeats.find(
                                  (seat) => seat.x === x && seat.y === y
                                )
                                  ? "--reserved"
                                  : ""
                              }` +
                              `${
                                selectedSeat?.x === x && selectedSeat?.y === y
                                  ? "--selected"
                                  : ""
                              }`
                            }
                            onClick={() => {
                              if (
                                stadium.reservedSeats.find(
                                  (seat) => seat.x === x && seat.y === y
                                )
                              )
                                return;
                              if (
                                selectedSeat?.x === x &&
                                selectedSeat?.y === y
                              )
                                setSelectedSeat(null);
                              else setSelectedSeat({ x, y });
                            }}
                          >
                            {y == 0 && (
                              <div
                                className={`match-page__match__stadium__grid__row__seat__above-label${
                                  selectedSeat?.x === x ? "--selected" : ""
                                }`}
                              >
                                {x + 1}
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="match-page__match__stadium__button-container">
              <div className="match-page__match__stadium__button-container__selected-seat">
                Selected Seat:
                {selectedSeat && (
                  <span className="match-page__match__stadium__button-container__selected-seat__seat-number">
                    {selectedSeat.x + 1},{" "}
                    {String.fromCharCode(65 + selectedSeat.y)}
                  </span>
                )}
              </div>
              <button
                className={`match-page__match__stadium__button-container__button${
                  !selectedSeat ? "--disabled" : ""
                }`}
                disabled={!selectedSeat}
              >
                Reserve Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
