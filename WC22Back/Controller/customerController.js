const userConnection = require('../Repositories/user');
const matchconnection = require('../Repositories/match');
const resconnection = require('../Repositories/reservation');
const bcrypt = require('bcrypt');

module.exports = {

    edit_data:  async function (req, res) {
        try {
            userConnection.updateUser(req.body.user).then((result) => {
                if(result) {
                    res.status(200).json({message: 'Data updated successfully'});
                } else {
                    res.status(400).json({error: 'Data not updated'});
                }
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({error: err.detail});
        }
    },

    reserve_ticket : async function (req, res) {
        try {
            const id = req.body.user_id;
            const reqMatch = await matchconnection.getMatch(req.body.match_id);
            if(reqMatch) {
                const result1 = await resconnection.getCustomerReservations(id);
                if (result1.length > 0) {
                    for(let i = 0; i < result1.length; i++) {
                        const match = await matchconnection.getMatch(result1[i].match_id);
                        // check if date is within 2 hours of match
                        const date1 = new Date(reqMatch.start_time);
                        const date2 = new Date(match.start_time);
                        const diffTime = Math.abs(date2 - date1);
                        // check if diff is less than 2 hours
                        if(diffTime < 7200000) {
                            res.status(400).json({ error: 'You already have a reservation within 2 hours of this match'});
                                return;
                        }
                    }
                    // Check if seat is available
                    
                    // const result2 = await resconnection.getMatchReservations(req.body.match_id);
                    //     if(req.body.chair_id in result2) {
                    //         res.status(400).json({ error: 'Seat is already reserved'});
                    //         return;
                    //     }
                    // Reserve seat
                    const result3 = resconnection.insertReservation(req.body);
                    res.status(200).json({result: result3});
                    return;
                }
                else {
                    // Check if seat is available
                    const result2 = resconnection.getMatchReservations(req.body.match_id);
                    if(req.body.chair_id in result2) {
                        res.status(400).json({error: 'Seat is already reserved'});
                        return;
                    }
                    // Reserve seat
                    const result3 = resconnection.insertReservation(req.body);
                    res.status(200).json({result: result3});
                    return;
                }
            }
        }
        catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    cancel_reservation : async function (req, res) {
        try {
            const match_id = req.body.match_id;
            const chair_id = req.body.chair_id;

            const reqMatch = await matchconnection.getMatch(req.body.match_id);
            if(reqMatch) {
                // check if time is at least 3 days before match
                console.log("Date.now() + 259200000: ");
                console.log(Date.now() + 259200000);
                console.log("reqMatch.date: ");
                console.log(reqMatch.start_time.getTime());
                if(Date.now() + 259200000 < reqMatch.start_time.getTime()) {
                    try{
                        resconnection.deleteReservation(chair_id, match_id).then((result) => {
                            if(result) {
                                res.status(200).json({message: 'Reservation cancelled'});
                            }
                            else {
                                res.status(400).json({error: 'Reservation not cancelled'});
                            }
                        });
                    }
                    catch (err) {
                        res.status(400).json({error: err.detail});
                    }
                }
                else {
                    res.status(400).json({error: 'You can only cancel a reservation 3 days before the match'});
                }
            }
            else {
                res.status(400).json({error: 'No match found'});
            }
        }
        catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    get_all_reservations : async function (req, res) {
        try {
            const user_id = req.user.id;
            resconnection.getCustomerReservations(user_id).then((result) => {
                res.status(200).json({result: result});
            });
        }
        catch (err) {
            res.status(400).json({error: err.detail});
        }
    }
}