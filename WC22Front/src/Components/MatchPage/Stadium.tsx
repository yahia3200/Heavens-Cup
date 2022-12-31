import React from "react";

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
}

export default function Stadium(props: Props) {
  const { stadium, selectedSeat, setSelectedSeat } = props;

  return (
    !(stadium.width >= 5 && stadium.height >= 5 && stadium.width <= 60 && stadium.height <= 25)?
    (<div className="match-page__match__stadium__grid__error"> width must be between 5 and 60 and height must be between 5 and 25 </div>)
    :
    (
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
