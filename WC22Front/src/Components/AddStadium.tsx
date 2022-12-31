import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { apiBaseUrl } from '../config.json';
import Stadium from './MatchPage/Stadium';

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

interface AddStadiumProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddStadium: React.FunctionComponent<AddStadiumProps> = ({ open, setOpen }) => {

    const [arenaName, setArenaName] = useState('Arena 51');
    const [nRows, setNRows] = useState(5);
    const [nCols, setNCols] = useState(5);

    const [error, setError] = useState('');
    const handleClose = () => setOpen(false);

    const { user } = useContext(UserContext);
    const token = user?.token;

    const handleSubmit = async () => {

        if (arenaName === '') {
            setError('Please enter a name for the arena');
            return;
        }

        const response = await fetch(`${apiBaseUrl}/create_stadium`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                stad_name: arenaName,
                num_rows: nRows,
                seats_per_row: nCols,
                token: token
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            setError(data.error);
        }
        else {
            setOpen(false);
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <h2 className="page-section__header">Add new arena</h2>
                    <form action="">
                        <div className="modal-container">
                            <div className="modal-col">
                                <label htmlFor='arena-name'>Arena Name: </label>
                                <label htmlFor='n-rows'>Number of Rows: </label>
                            </div>
                            <div className="modal-col">
                                <input name='arena-name' id='arena-name' type="text" value={arenaName} onChange={
                                    (e) => {
                                        if (e.target.value === '') {
                                            setError('Please enter a name for the arena');
                                        }
                                        else {
                                            setError('');
                                        }
                                        setArenaName(e.target.value);
                                    }
                                } />
                                <input name='n-rows' id='n-rows' type="number" value={nRows} onChange={
                                    (e) => {
                                        console.log(e.target.value);
                                        if (e.target.value === '') {
                                            setError('Please enter a number of rows');
                                            setNRows(NaN)
                                            return;
                                        }

                                        const currentNRows = parseInt(e.target.value);

                                        if (currentNRows < 5) {
                                            setError('Number of rows must be between 5 and 25');
                                        }
                                        else if (currentNRows > 25) {
                                            setError('Number of rows must be between 5 and 25');
                                        }
                                        else {
                                            setError('');
                                        }

                                        setNRows(currentNRows);
                                    }
                                } />
                            </div>
                            <div className="modal-col">
                                <label></label>
                                <label htmlFor='n-cols'>Number of Columns: </label>
                            </div>
                            <div className="modal-col">
                                <label></label>
                                <input name='n-cols' id='n-cols' type="number" value={nCols} onChange={
                                    (e) => {
                                        if (e.target.value === '') {
                                            setError('Please enter a number of columns');
                                            setNCols(NaN)
                                            return;
                                        }

                                        const currentNCols = parseInt(e.target.value);

                                        if (currentNCols < 5) {
                                            setError('Number of columns must be between 5 and 25');
                                        }
                                        else if (currentNCols > 60) {
                                            setError('Number of columns must be between 5 and 60');
                                        }
                                        else {
                                            setError('');
                                        }

                                        setNCols(currentNCols);
                                    }
                                } />
                            </div>
                        </div>
                        <div className='SignIn__form__button'>
                            <button className='match-page__match__stadium__button-container__button'
                            disabled={error ? true : false} type='submit' onClick={
                                (e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }>Add Arena</button>
                        </div>

                        <div className='SignIn__form__error'>
                            {error}
                        </div>
                    </form>
                    <Stadium
                        stadium={{
                            width: nCols,
                            height: nRows,
                            reservedSeats: [],
                        }}
                        disabled={true}
                        selectedSeat={null}
                        setSelectedSeat={null}
                        userType={'manager'}
                    />
                </Box>

            </Modal>

        </div>
    );
}

export default AddStadium;