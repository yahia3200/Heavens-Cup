import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { charsData } from '../Components/MatchPage/chars'
import { apiBaseUrl } from '../config.json';
import { Stadium, Referee, Character } from '../Types';

interface CreateMatchProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderWidth: '10px 1px 1px',
    borderStyle: 'solid',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    borderColor: '#e8e8e8',
    borderTopColor: '#e90052',
    boxShadow: 24,
    p: 4,
};

const CreateMatch: React.FunctionComponent<CreateMatchProps> = ({ open, setOpen }) => {
    const { user } = useContext(UserContext);
    const token = user?.token

    const [availableStadiums, setAvailableStadiums] = useState<Stadium[]>([]);
    const [availableReferees, setAvailableReferees] = useState<Referee[]>([]);
    const [availableChars, setAvailableChars] = useState<Character[]>()

    const handleClose = () => setOpen(false);

    const [firstTeam, setFirstTeam] = useState('');
    const [secondTeam, setSecondTeam] = useState('');
    const [arena, setArena] = useState('');
    const [referee, setReferee] = useState('');
    const [firstLinesmen, setFirstLinesmen] = useState('');
    const [secondLinesmen, setSecondLinesmen] = useState('');
    const [date, setDate] = useState('');
    const [matchTime, setMatchTime] = useState('');

    useEffect(() => {
        fetch(`${apiBaseUrl}/get_all_stadiums`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const stadiums = data.stads.map((stadium: any) => {
                    return {
                        name: stadium.stad_name,
                        height: stadium.num_rows,
                        width: stadium.seats_per_row,
                        id: stadium.id
                    }
                });
                setAvailableStadiums(stadiums);
                setArena(stadiums[0]?.name);
            })
    }, [open])

    useEffect(() => {
        fetch(`${apiBaseUrl}/get_all_refrees`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                const referees = data.referees.map((referee: any) => {
                    return {
                        name: referee.ref_name,
                        id: referee.id
                    }
                });
                setAvailableReferees(referees);
                setReferee(referees[0]?.name);
                setFirstLinesmen(referees[0]?.name);
                setSecondLinesmen(referees[0]?.name);
            })
    }, [open])

    useEffect(() => {
        fetch(`${apiBaseUrl}/get_all_teams`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const chars = data.teams.map((char: any) => {
                    return {
                        name: char.team_name,
                        id: char.id,
                        image: char.image_url,
                        nen: char.nen,
                        hue_rotate: char.hue_rotate,
                        hunterpedia: char.hunterpedia
                    }
                });
                setAvailableChars(chars);
                setFirstTeam(chars[0]?.name);
                setSecondTeam(chars[0]?.name);
            })
    }, [open])

    const handleSubmit = () => {
        const firstTeamId = availableChars?.find(char => char.name === firstTeam)?.id;
        const secondTeamId = availableChars?.find(char => char.name === secondTeam)?.id;
        const arenaId = availableStadiums.find(stadium => stadium.name === arena)?.id;
        const refereeId = availableReferees.find(av_referee => av_referee.name === referee)?.id;
        const firstLinesmenId = availableReferees.find(referee => referee.name === firstLinesmen)?.id;
        const secondLinesmenId = availableReferees.find(referee => referee.name === secondLinesmen)?.id;
        const matchDate = new Date(`${date}T${matchTime}`).toISOString();

        fetch(`${apiBaseUrl}/create_match`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                team1: firstTeamId,
                team2: secondTeamId,
                stad_id: arenaId,
                main_ref: refereeId,
                line_man_1: firstLinesmenId,
                line_man_2: secondLinesmenId,
                start_time: matchDate
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === 'Match created successfully') {
                    setOpen(false);
                }
            }
            )
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <h2 className="page-section__header">Create new match</h2>
                    <div className="modal-container">
                        <div className="modal-col">
                            <label htmlFor='team1'>First Team: </label>
                            <label htmlFor='arena'>Arena: </label>
                            <label htmlFor='main-ref'>Main Referee: </label>
                            <label htmlFor='second-linesmen'>Second Linesmen: </label>
                        </div>
                        <div className="modal-col">
                            <select name="team1" id="team1" value={firstTeam} onChange={
                                (e) => {
                                    setFirstTeam(e.target.value)
                                }
                            }>
                                {
                                    availableChars?.map(char => {
                                        return (
                                            <option key={char.name} value={char.name}>{char.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <select name="arena" id="arena" value={arena} onChange={
                                (e) => {
                                    setArena(e.target.value)
                                }
                            }>
                                {
                                    availableStadiums.map(stadium => {
                                        return (
                                            <option key={stadium.name} value={stadium.name}>{stadium.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="main-ref" id="main-ref" value={referee} onChange={
                                (e) => {
                                    setReferee(e.target.value)
                                }
                            }>
                                {
                                    availableReferees.map(referee => {
                                        return (
                                            <option key={referee.name} value={referee.name}>{referee.name}</option>
                                        )
                                    })
                                }
                            </select>

                            <select name="second-linesmen" id="second-linesmen" value={secondLinesmen} onChange={
                                (e) => {
                                    setSecondLinesmen(e.target.value)
                                }
                            }>
                                {
                                    availableReferees.map(referee => {
                                        return (
                                            <option key={referee.name} value={referee.name}>{referee.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="modal-col">
                            <label htmlFor='team2'>Second Team: </label>
                            <label htmlFor='date'>Date: </label>
                            <label htmlFor='date'>Time: </label>
                            <label htmlFor='first-linesmen'>First Linesmen: </label>
                        </div>
                        <div className="modal-col">
                            <select name="team2" id="team2" value={secondTeam} onChange={
                                (e) => {
                                    setSecondTeam(e.target.value)
                                }
                            }>
                                {
                                    availableChars?.map(char => {
                                        return (
                                            <option key={char.name} value={char.name}>{char.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input name='date' id='date' type="date" value={date} onChange={
                                (e) => {
                                    setDate(e.target.value)
                                }
                            } />
                            <input name='time' id='time' type="time" value={matchTime} onChange={
                                (e) => {
                                    setMatchTime(e.target.value)
                                }
                            } />
                            <select name="first-linesmen" id="first-linesmen" value={firstLinesmen} onChange={
                                (e) => {
                                    setFirstLinesmen(e.target.value)
                                }
                            }>
                                {
                                    availableReferees.map(referee => {
                                        return (
                                            <option key={referee.name} value={referee.name}>{referee.name}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <div className='SignIn__form__button'>
                        <button type='submit' onClick={
                            e => {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }>Create Match</button>
                    </div>
                </Box>

            </Modal>
        </div >
    );
}

export default CreateMatch;