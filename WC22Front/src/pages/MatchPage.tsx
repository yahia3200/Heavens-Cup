import React from "react";

export default function MatchPage() {
  return (
    <div className="match-page">
      <div className="match-page__overlay">
      </div>
      <div className="match-page__match">
        <div className="match-page__match__date">2021-06-11</div>
        <div className="match-page__match__teams">
          <div className="match-page__match__teams__team">
            <div className="match-page__match__teams__team__flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
            <div className="match-page__match__teams__team__name">England</div>
          </div>
          <div className="match-page__match__teams__team">
            <div className="match-page__match__teams__team__flag">🇫🇷</div>
            <div className="match-page__match__teams__team__name">France</div>
          </div>
        </div>
        <div className="match-page__match__refrees">
            <div className="match-page__match__refrees__primary-refree"> Hamada </div>
            <div className="match-page__match__refrees__secondary-refree"> Alaa </div>
            <div className="match-page__match__refrees__secondary-refree"> Alaa </div>
        </div>
        <div className="match-page__match__stadium">awgwa</div>
      </div>
    </div>
  );
}
