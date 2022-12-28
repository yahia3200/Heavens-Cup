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
                            stadium: "Boavista Stadium",
                            id: "1",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Alianz Arena",
                            id: "2",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "San Siro",
                            id: "3",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Santrian Stadium",
                            id: "4",
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
                            stadium: "Stadium Name",
                            id: "5",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name",
                            id: "6",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name",
                            id: "7",
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
                            stadium: "Stadium Name",
                            id: "8",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name",
                            id: "1",
                        },
                        {
                            date: 'Saturday 12 December 2012',
                            time: '14:30',
                            team1: "First Team",
                            team2: "Second Team",
                            referees: ["referee 1", "referee 2", "referee 3"],
                            stadium: "Stadium Name",
                            id: "1",
                        },
                    ]
                } />
            </div>
        </div>
    );
}

export default Fixtures;