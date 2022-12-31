import { useState, useEffect } from "react";
import FixturesTable from "../Components/Fixtures/FixturesTable";
import PageHeader from "../Components/PageHeader";
import { apiBaseUrl } from '../config.json'
import { Match } from '../Types'
import '../styles/Fixtures.scss'

interface FixturesProps {

}

const Fixtures: React.FunctionComponent<FixturesProps> = () => {

    const [matches, setMatches] = useState();

    useEffect(() => {
        fetch(`${apiBaseUrl}/get_all_matches`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                const matches: Match[] = data.matches.map((match: any) => {
                    const date = new Date(match.start_time);

                    // get hour and minutes from date in form of 14:30
                    const time = date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' });

                    // transform date to a string like Tuesday 1 January 2020
                    const dateStr = `${date.toLocaleString('en-us', { weekday: 'long' })} ${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()}`;
                    return {
                        date: dateStr,
                        time: time,
                        team1: match.team1_name,
                        team2: match.team2_name,
                        referees: [],
                        stadium: match.stad_name,
                        id: match.id,
                    }
                }
                );

                const matchesObj = matches.reduce((acc: any, match: Match) => {
                    if (acc[match.date]) {
                        acc[match.date].push(match);
                    } else {
                        acc[match.date] = [match];
                    }
                    return acc;
                }, {});
                setMatches(matchesObj);

            }
            );

    }, []);


    return (
        <div className='fixtures'>
            <PageHeader headerText='Fixtures' />

            <div className='wrapper'>
                {
                    matches ?
                        Object.keys(matches).map((date: string, index: number) => {
                            return <FixturesTable key={index} matches={matches[date]} />
                        })
                        :
                        <div className='fixtures__no-matches'>
                            <h1>No matches found</h1>
                        </div>
                }
            </div>
        </div>
    );
}

export default Fixtures;