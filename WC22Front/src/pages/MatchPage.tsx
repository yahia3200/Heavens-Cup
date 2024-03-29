import React, { useState, useEffect, useContext } from "react";
import "../styles/MatchPage.scss";
import {
  charsData,
  nenColors,
  NenTypes,
} from "../Components/MatchPage/chars";
import PageHeader from "../Components/PageHeader";
import Stadium from "../Components/MatchPage/Stadium";
import { UserContext } from "../contexts/userContext";
import EditMatch from "../Components/EditMatch";
import { Match, StadiumType, toCustomDate, getTime } from "../Types";
import PaymentForm from "../Components/PaymentForm";
import Vs from "../assets/Vs.png";
import transmuter from "../assets/Transmuter.webp";
import conjurer from "../assets/Conjurer.webp";
import enhancer from "../assets/Enhancer.webp";
import emitter from "../assets/Emitter.webp";
import manipulator from "../assets/Manipulator.webp";
import specialist from "../assets/Specialist.webp";

import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../config.json'

// map of nen types to images
const nenImages = new Map<'Enhancer' | 'Transmuter' | 'Conjurer' | 'Specialist' | 'Emitter' | 'Manipulator', string>([
  ['Enhancer', enhancer],
  ['Transmuter', transmuter],
  ['Conjurer', conjurer],
  ['Specialist', specialist],
  ['Emitter', emitter],
  ['Manipulator', manipulator
  ]]);

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);
  const [stadiumDetails, setStadiumDetails] = useState<StadiumType | null>(null);

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

  const [reservedSeat, setReservedSeat] = useState<{ x: number; y: number } | null>(null);

  // state for triggering match details update
  const [updateTrigger, setUpdateTrigger] = useState(false);

  function cancelReservation(matchId: string, seatId: {
    x: number;
    y: number;
  } | null) {
    if (!seatId) {
      return;
    }
    fetch(`${apiBaseUrl}/cancel_reservation`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        match_id: matchId,
        chair_id: seatId.y * stadiumDetails!.width + seatId.x,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateTrigger(!updateTrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch(`${apiBaseUrl}/view_match_details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setMatchDetails({
          date: toCustomDate(new Date(data.match.start_time)),
          time: getTime(new Date(data.match.start_time)),
          team1: data.match.team1_name,
          team2: data.match.team2_name,
          referees: [data.match.main_ref, data.match.line_man_1, data.match.line_man_2],
          stadium: data.match.stad_name,
          id: data.match.id,
        });

        const reservedSeats = data.reservations
          .filter((seat: any) => seat.user_id !== user?.id)
          .map((seat: any) => {
            return {
              y: Math.floor(seat.chair_id / data.match.seats_per_row),
              x: seat.chair_id % data.match.seats_per_row,
            };
          });

        const seat = data.reservations.find((seat: any) => seat.user_id === user?.id);
        if (seat) {
          setReservedSeat({
            y: Math.floor(seat.chair_id / data.match.seats_per_row),
            x: seat.chair_id % data.match.seats_per_row,
          });
        } else {
          setReservedSeat(null);
          setSelectedSeat(null);
        }
        setStadiumDetails({
          name: data.match.stad_name,
          width: data.match.seats_per_row,
          height: data.match.num_rows,
          reservedSeats: reservedSeats,
          id: "",
        });

      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateTrigger]);
  return (
    <>
      <PageHeader headerText="Match Page" />
      {(matchDetails && stadiumDetails) && <>
        <div className="match-page">
          <div className="match-page__date-and-time-container">
            <div className="match-page__date-and-time-container__date">
              {matchDetails.date}
            </div>
            <div className="match-page__date-and-time-container__time">
              {`${matchDetails.time} GMT`}
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
                        filter: `hue-rotate(${charsData.get(matchDetails.team1.split(' ')[0])!["hue-rotate"]
                          })`,
                      }}
                    >
                      <img
                        src={charsData.get(matchDetails.team1.split(' ')[0])!.image}
                        alt=""
                        style={{
                          filter: `hue-rotate(-${charsData.get(matchDetails.team1.split(' ')[0])!["hue-rotate"]
                            })`,
                        }}
                      />
                    </div>
                    <div className="match-page__match__info__inner__teams__image-container__vs">
                      <img src={Vs} alt="" />
                    </div>
                    <div
                      className="match-page__match__info__inner__teams__image-container__image-2"
                      style={{
                        filter: `hue-rotate(${charsData.get(matchDetails.team2.split(' ')[0])!["hue-rotate"]
                          })`,
                      }}
                    >
                      <img
                        src={charsData.get(matchDetails.team2.split(' ')[0])!.image}
                        alt=""
                        style={{
                          filter: `hue-rotate(-${charsData.get(matchDetails.team2.split(' ')[0])!["hue-rotate"]
                            })`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="match-page__match__info__inner__teams__team-name">
                    <div className="match-page__match__info__inner__teams__team-name-1">
                      <img
                        src={nenImages.get(charsData.get(matchDetails.team1.split(' ')[0])!.nen!)!}
                        alt=""
                      />
                      <div className="match-page__match__info__inner__teams__team-name-1__name">
                        <div className="match-page__match__info__inner__teams__team-name-1__name__name">
                          {charsData.get(matchDetails.team1.split(' ')[0])!.name}
                        </div>
                        <div
                          className="match-page__match__info__inner__teams__team-name-1__name__nen"
                          style={{
                            color: `${nenColors[
                              NenTypes[charsData.get(matchDetails.team1.split(' ')[0])!.nen!]
                            ]
                              }`,
                          }}
                        >
                          {charsData.get(matchDetails.team1.split(' ')[0])!.nen}
                        </div>
                      </div>
                    </div>
                    <div className="match-page__match__info__inner__teams__team-name-2">
                      <div className="match-page__match__info__inner__teams__team-name-2__name">
                        <div className="match-page__match__info__inner__teams__team-name-2__name__name">
                          {charsData.get(matchDetails.team2.split(' ')[0])!.name}
                        </div>
                        <div
                          className="match-page__match__info__inner__teams__team-name-2__name__nen"
                          style={{
                            color: `${nenColors[
                              NenTypes[charsData.get(matchDetails.team2.split(' ')[0])!.nen!]
                            ]
                              }`,
                          }}
                        >
                          {charsData.get(matchDetails.team2.split(' ')[0])!.nen}
                        </div>
                      </div>
                      <img
                        src={nenImages.get(charsData.get(matchDetails.team2.split(' ')[0])!.nen!)!}
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
                    {matchDetails.referees[0]}
                  </div>
                  <div className="match-page__match__info__inner__referees__secondary-referee">
                    {matchDetails.referees[1]}
                  </div>
                  <div className="match-page__match__info__inner__referees__secondary-referee">
                    {matchDetails.referees[2]}
                  </div>
                </div>
              </div>
            </div>
            {/* Create a grid of seats with reserved seats of stadium, with labels for rows and columns*/}
            <div className="match-page__match__stadium">
              <div className="match-page__match__stadium__header"> Stadium </div>
              <div className="match-page__match__stadium__name">
                {stadiumDetails.name}
              </div>
              <Stadium
                stadium={stadiumDetails}
                selectedSeat={reservedSeat ? reservedSeat : selectedSeat}
                setSelectedSeat={setSelectedSeat}
                userType={reservedSeat ? "manager" : user?.type}
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
                  reservedSeat ? (
                    <button
                      className={`match-page__match__stadium__button-container__button`}
                      onClick={() => {
                        cancelReservation(matchDetails.id!, reservedSeat!);
                      }}
                    >
                      Cancel Reservation
                    </button>) : (
                    <button
                      className={`match-page__match__stadium__button-container__button${!selectedSeat ? "--disabled" : ""
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
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {
        /* Edit Match Modal */ editMatchModalOpen && (
            <EditMatch
              match={matchDetails}
              setOpen={setEditMatchModalOpen}
              open={editMatchModalOpen}
              setUpdateTrigger={setUpdateTrigger}
              updateTrigger={updateTrigger}
            />
          )
        }
        {
        /* Payment Modal */ paymentModalOpen && (
            <PaymentForm
              setOpen={setPaymentModalOpen}
              open={paymentModalOpen}
              stadium={stadiumDetails}
              seat={selectedSeat!}
              match={matchDetails}
              setUpdateTrigger={setUpdateTrigger}
            />
          )
        }
      </>}
    </>
  );
}
