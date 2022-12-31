import React, { useState, useContext } from "react";
import "../styles/MatchPage.scss";
import {
  chars,
  charsData,
  nenColors,
  NenTypes,
} from "../Components/MatchPage/chars";
import PageHeader from "../Components/PageHeader";
import Stadium from "../Components/MatchPage/Stadium";
import { UserContext } from "../contexts/userContext";
import EditMatch from "../Components/EditMatch";
import { Match } from "../Types";
import PaymentForm from "../Components/PaymentForm";

const match: Match = {
  // add date based on type format of dateType
  date: "Monday 1 January 2021",
  time: "16:30",
  team1: "Gon",
  team2: "Killua",
  referees: ["Keenan Crane", "Naruto", "Sasuke"],
  stadium: "Marineford",
  id: "1",
};
const stadium = {
  name: "Heaven's Arena",
  image: "",
  width: 60,
  height: 10,
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

export default function MatchPage() {
  // get current user from context
  const { user } = useContext(UserContext);
  // state for opening and closing editMatchModal
  const [editMatchModalOpen, setEditMatchModalOpen] = useState(false);
  // state for opening and closing PaymentModal
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pageState, setPageState] = useState<
    "guest" | "watcher" | "manager-viewing" | "manager-editing"
  >("watcher");
  const [selectedSeat, setSelectedSeat] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function setSelectedSeatCallback(x: number, y: number) {
    setSelectedSeat({ x, y });
  }

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
                    <img src="/src/assets/Vs.png" alt="" />
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
            <Stadium
              stadium={stadium}
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
              userType={user?.type}
              disabled={false}
            />
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
              {/* if manager, make it editMatch Button, else reserve seat button */}
              {user?.type === "manager" ? (
                <button
                  className={`match-page__match__stadium__button-container__button`}
                  onClick={() => {
                    setEditMatchModalOpen(true);
                  }}
                >
                  Edit Match
                </button>
              ) : (
                <button
                  className={`match-page__match__stadium__button-container__button${
                    !selectedSeat ? "--disabled" : ""
                  }`}
                  disabled={!selectedSeat}
                  onClick={() => {
                    if (selectedSeat) {
                      setPaymentModalOpen(true);
                    }
                  }}
                >
                  Reserve Seat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        /* Edit Match Modal */ editMatchModalOpen && (
          <EditMatch
            match={match}
            setOpen={setEditMatchModalOpen}
            open={editMatchModalOpen}
          />
        )
      }
      {
        /* Payment Modal */ paymentModalOpen && (
          <PaymentForm
            setOpen={setPaymentModalOpen}
            open={paymentModalOpen}
            match={match}
            seat={selectedSeat!}
          />
        )
      }
    </>
  );
}
