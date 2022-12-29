import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { charsData } from '../Components/MatchPage/chars'
import { apiBaseUrl } from '../config.json';

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

    const [availableStadiums, setAvailableStadiums] = useState<string[]>([]);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`${apiBaseUrl}/get_all_teams`, {
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
                console.log(data)
                // const stadiums = data.stads.map((stadium: any) => stadium.stad_name);
                // console.log(stadiums);
                // setAvailableStadiums(data.stadiums);
            })
    }, [])

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
                            <select name="team1" id="team1">
                                {
                                    Array.from(charsData.keys()).map(char => {
                                        return (
                                            <option key={char} value={char}>{char}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="arena" id="arena">
                                {
                                    availableStadiums.map(stadium => {
                                        return (
                                            <option key={stadium} value={stadium}>{stadium}</option>
                                        )
                                    })
                                }
                            </select>
                            <input name='main-ref' id='main-ref' type="text" />
                            <input name='second-linesmen' id='second-linesmen' type="text" />
                        </div>
                        <div className="modal-col">
                            <label htmlFor='team2'>Second Team: </label>
                            <label htmlFor='date'>Date: </label>
                            <label htmlFor='first-linesmen'>First Linesmen: </label>
                        </div>
                        <div className="modal-col">
                            <select name="team2" id="team2">
                                {
                                    Array.from(charsData.keys()).map(char => {
                                        return (
                                            <option key={char} value={char}>{char}</option>
                                        )
                                    })
                                }
                            </select>
                            <input name='date' id='date' type="date" />
                            <input name='first-linesmen' id='first-linesmen' type="text" />
                        </div>
                    </div>
                    <div className='SignIn__form__button'>
                        <button type='submit'>Create Match</button>
                    </div>
                </Box>

            </Modal>
        </div>
    );
}

export default CreateMatch;