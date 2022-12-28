import FixturesTable from "../Components/Fixtures/FixturesTable";
import PageHeader from "../Components/PageHeader";
import '../styles/Fixtures.scss'

interface FixturesProps {

}

const Fixtures: React.FunctionComponent<FixturesProps> = () => {
    return (
        <div className='fixtures'>
            <PageHeader headerText='Fixtures' />

            <div className='wrapper'>
                <FixturesTable matches={
                    [
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                    ]
                } />
                <FixturesTable matches={
                    [
                        {
                            date: 'Saturday 13 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                    ]
                } />

                <FixturesTable matches={
                    [
                        {
                            date: 'Saturday 13 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name"
                        },
                    ]
                } />
            </div>
        </div>
    );
}

export default Fixtures;