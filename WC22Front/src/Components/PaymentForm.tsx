import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { apiBaseUrl } from '../config.json';
import { Referee, Character, Match, StadiumType } from '../Types';

interface PaymentFormProps {
    stadium: StadiumType;
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

const PaymentForm: React.FunctionComponent<PaymentFormProps> = ({ match, stadium, open, setOpen, seat }) => {
    const { user } = useContext(UserContext);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardExpiry, setCardExpiry] = useState<string>('');
    const [cardCvv, setCardCvv] = useState<string>('');
    const [cardName, setCardName] = useState<string>('');

    const [error, setError] = useState<string | null>('');
    const token = user?.token

    const handleClose = () => setOpen(false);

    const handleCheckout = async () => {
        /**if (cardNumber.length < 16) {
            setError('Card number is invalid');
            return;
        }
        if (cardExpiry.length < 4) {
            setError('Expiry date is invalid');
            return;
        }
        if (cardCvv.length < 3) {
            setError('CVV is invalid');
            return;
        }
        if (cardName.length < 3) {
            setError('Name is invalid');
            return;
        }**/

        setError('')
        console.log(seat.x + seat.y * stadium.width)
        console.log(match.id)
        console.log(user?.id)
        const response = await fetch(`${apiBaseUrl}/reserve_ticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                chair_id: seat.x + seat.y * stadium.width,
                match_id: match.id,
                user_id: user?.id
            })
        });

        if (response.ok) {
            handleClose();
        }
        else {
            const { error } = await response.json();
            setError(error);
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
                    <h2 className="page-section__header">Checkout</h2>
                    <div className="modal-container">
                        <div className="modal-col">
                            {/* form for payment */}
                            <label htmlFor="card-number">Card Number</label>
                            <label htmlFor="card-expiry">Expiry Date</label>
                            <div className='SignIn__form__button'>
                                <button className='match-page__match__stadium__button-container__button'
                                    type='submit' onClick={
                                        e => {
                                            e.preventDefault();
                                            handleCheckout();
                                        }
                                    }>Checkout</button>

                            </div>
                            <div className='SignIn__form__error payment-error'>
                                {error}
                            </div>
                        </div>
                        <div className="modal-col">
                            <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={
                                e => {
                                    setCardNumber(e.target.value);
                                }
                            } />
                            <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/YY" value={cardExpiry} onChange={
                                e => {
                                    setCardExpiry(e.target.value);
                                }
                            } />
                        </div>
                        <div className="modal-col">
                            <label htmlFor="card-cvv">CVV</label>
                            <label htmlFor="card-name">Name on Card</label>
                        </div>
                        <div className="modal-col">
                            <input type="text" id="card-cvv" name="card-cvv" placeholder="123" value={cardCvv} onChange={
                                e => {
                                    setCardCvv(e.target.value);
                                }
                            } />
                            <input type="text" id="card-name" name="card-name" placeholder="John Doe" value={cardName} onChange={
                                e => {
                                    setCardName(e.target.value);
                                }
                            } />
                        </div>

                    </div>

                </Box>

            </Modal>
        </div >
    );
}

export default PaymentForm;