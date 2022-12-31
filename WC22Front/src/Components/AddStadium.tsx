import { useState, useContext } from 'react';
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

    const [arenaName, setArenaName] = useState('');
    const [nRows, setNRows] = useState(0);
    const [nCols, setNCols] = useState(0);

    const [error, setError] = useState('');
    const handleClose = () => setOpen(false);

    const { user } = useContext(UserContext);
    const token = user?.token;

    const handleSubmit = async () => {

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
                                        setArenaName(e.target.value);
                                    }
                                } />
                                <input name='n-rows' id='n-rows' type="number" value={nRows} onChange={
                                    (e) => {
                                        setNRows(parseInt(e.target.value));
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
                                        setNCols(parseInt(e.target.value));
                                    }
                                } />
                            </div>
                        </div>
                        <div className='SignIn__form__button'>
                            <button className='match-page__match__stadium__button-container__button'
                            type='submit' onClick={
                                (e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }>Add Arena</button>
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
                    />
                </Box>

            </Modal>

        </div>
    );
}

export default AddStadium;