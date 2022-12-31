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
                    res.status(400).json({message: 'Data not updated'});
                }
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({error: err.detail});
        }
    },

    reserve_ticket : async function (req, res) {
        try {
            const {id} = req.user.id;
            const {reqMatch} = matchconnection.getMatch(req.body.match_id);
            if(reqMatch) {
                resconnection.getCustomerReservations(id).then((result) => {
                    if (result.length > 0) {
                        for(const res in result) {
                            matchconnection.getMatch(res.match_id).then((match) => {
                                // check if date is within 2 hours of match
                                if(reqMatch.date >= match.date && reqMatch.date <= match.date + 72000000) {
                                    res.status(400).json('You already have a reservation within 2 hours of this match');
                                    return;
                                }
                            });
                        }
                        // Check if seat is available
                        resconnection.getMatchReservations(req.body.match_id).then((result) => {
                            if(req.body.chair_id in result) {
                                res.status(400).json('Seat is already reserved');
                                return;
                            }
                        });
                        // Reserve seat
                        resconnection.insertReservation(req.body).then((result) => {
                            res.status(200).json(result);
                        });

                    }
                    else {
                        // Check if seat is available
                        resconnection.getMatchReservations(req.body.match_id).then((result) => {
                            if(req.body.chair_id in result) {
                                res.status(400).json('Seat is already reserved');
                                return;
                            }
                        });
                        // Reserve seat
                        resconnection.insertReservation(req.body).then((result) => {
                            res.status(200).json(result);
                        });
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    cancel_reservation : async function (req, res) {
        try {
            const user_id = req.user.id;
            const match_id = req.body.match_id;
            const chair_id = req.body.chair_id;

            const {reqMatch} = matchconnection.getMatch(req.body.match_id);
            if(reqMatch) {
                // check if time is at least 3 days before match
                if(Date.now() + 259200000 < reqMatch.date) {
                    try{
                        resconnection.deleteReservation(chair_id, match_id).then((result) => {
                            if(result) {
                                res.status(200).json('Reservation cancelled');
                            }
                            else {
                                res.status(400).json('Reservation not cancelled');
                            }
                        });
                    }
                    catch (err) {
                        res.status(400).json({error: err.detail});
                    }
                }
                else {
                    res.status(400).json('You can only cancel a reservation 3 days before the match');
                }
            }
            else {
                res.status(400).json('No match found');
            }
        }
        catch (err) {
            res.status(400).json({error: err.detail});
        }
    }
}