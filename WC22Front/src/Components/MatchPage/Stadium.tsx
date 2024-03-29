import React from "react";
import { userType } from "../../Types";

// props
interface Props {
  stadium: {
    width: number;
    height: number;
    reservedSeats: {
      x: number;
      y: number;
    }[];
  };
  selectedSeat: {
    x: number;
    y: number;
  } | null;
  // default value is null
  setSelectedSeat?:
    | ((
        seat: {
          x: number;
          y: number;
        } | null
      ) => void)
    | null;
  disabled: boolean;
  userType: userType | undefined;
}

export default function Stadium(props: Props) {
  const { stadium, selectedSeat, setSelectedSeat, userType } = props;

  return (
    !(stadium.width >= 5 && stadium.height >= 5 && stadium.width <= 60 && stadium.height <= 25)?
    (<div className="match-page__match__stadium__grid__error"></div>)
    :
    (
    <div className="match-page__match__stadium__grid">
      {Array.from(Array(stadium.height).keys()).map((y, index1) => {
        return (
          <div className="match-page__match__stadium__grid__row">
            {Array.from(Array(stadium.width).keys()).map((x, index2) => {
              return (
                <>
                  {x == 0 && (
                    <div
                      // get a unique key
                      key={index1 * stadium.width + index2}
                      className={`match-page__match__stadium__grid__row__label${
                        selectedSeat?.y === y ? "--selected" : ""
                      }`}
                    >
                      {String.fromCharCode(65 + y)}
                    </div>
                  )}
                  <div
                      style={{
                      width: `${
                        10 +
                        Math.ceil(
                          40 /
                            Math.sqrt(
                              Math.max(stadium.width, stadium.height) + 1
                            )
                        )
                      }px`,
                    }}
                    className={
                      `match-page__match__stadium__grid__row__seat` +
                      `${
                        stadium.reservedSeats.find(
                          (seat) => seat.x === x && seat.y === y
                        ) || props.disabled
                          ? "--reserved"
                          : ""
                      }` +
                      `${
                        selectedSeat?.x === x && selectedSeat?.y === y
                          ? "--selected"
                          : ""
                      }` + ` match-page__match__stadium__grid__row__seat--${userType}`
                    }
                    onClick={() => {
                      if (props.disabled || !userType || userType === "manager") return;
                      if (
                        stadium.reservedSeats.find(
                          (seat) => seat.x === x && seat.y === y
                        )
                      )
                        return;
                      if (
                        selectedSeat?.x === x &&
                        selectedSeat?.y === y &&
                        setSelectedSeat
                      )
                        setSelectedSeat(null);
                      else if (setSelectedSeat) setSelectedSeat({ x, y });
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
  ));
}
