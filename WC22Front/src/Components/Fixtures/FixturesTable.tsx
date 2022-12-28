import '../../styles/Fixtures.scss'
import { Match } from '../../Types';

interface FixturesTableProps {
    matches: Match[];
}

const FixturesTable: React.FunctionComponent<FixturesTableProps> = ({ matches }) => {
    return (
        <div className="fixtures__table">
            <div className="fixtures__table__header">
                <h2>{matches[0].date}</h2>
                <span className="logo"></span>
            </div>

            {
                matches.map((match, index) => {
                    return (
                        <div className="fixtures__table__row" key={index}>
                            <div className="fixtures__table__row__teams">
                                <span className="fixtures__table__row__teams__team-name team1-name">{match.team1}</span>
                                <span className="fixtures__table__row__teams__team-logo">
                                    <img src="https://resources.premierleague.com/premierleague/badges/25/t94.png" alt="" />
                                </span>
                                <time >{match.time}</time>
                                <span className="fixtures__table__row__teams__team-logo">
                                    <img src="https://resources.premierleague.com/premierleague/badges/25/t94.png" alt="" />
                                </span>
                                <span className="fixtures__table__row__teams__team-name team2-name">{match.team2}</span>
                            </div>

                            <div className="fixtures__table__row__stadium">
                                <span className="fixtures__table__row__stadium__stadium-logo">
                                </span>
                                <span className="fixtures__table__row__stadium__stadium-name">{match.stadium}</span>
                            </div>

                            <div className="fixtures__table__row__stadium">
                                <span className="fixtures__table__row__stadium__stadium-logo">
                                </span>
                                <span className="fixtures__table__row__stadium__stadium-name">{match.stadium}</span>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default FixturesTable;