import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { apiBaseUrl } from '../config.json';
import { Stadium, Referee, Character, Match } from '../Types';

interface PaymentFormProps {
    match: Match;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    seat: { x: number, y: number };
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

const PaymentForm: React.FunctionComponent<PaymentFormProps> = ({ match, open, setOpen }) => {
    const { user } = useContext(UserContext);
    const token = user?.token

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <h2 className="page-section__header">Checkout</h2>
                    <div className="modal-container">
                        <div className="modal-col">
                            {/* form for payment */}
                            <label htmlFor="card-number">Card Number</label>
                            <label htmlFor="card-expiry">Expiry Date</label>
                        </div>
                        <div className="modal-col">
                            <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" />
                            <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/YY" />
                        </div>
                        <div className="modal-col">
                            <label htmlFor="card-cvv">CVV</label>
                            <label htmlFor="card-name">Name on Card</label>
                        </div>
                        <div className="modal-col">
                            <input type="text" id="card-cvv" name="card-cvv" placeholder="123" />
                            <input type="text" id="card-name" name="card-name" placeholder="John Doe" />
                        </div>

                    </div>
                    <div className='SignIn__form__button'>
                        <button className='match-page__match__stadium__button-container__button'
                         type='submit' onClick={
                            e => {
                                e.preventDefault();
                            }
                        }>Checkout</button>
                    </div>
                </Box>

            </Modal>
        </div >
    );
}

export default PaymentForm;