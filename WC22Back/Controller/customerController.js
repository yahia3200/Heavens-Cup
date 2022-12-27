const resconnection = require('../Repositories/reservation');
const matchconnection = require('../Repositories/match');

const jwt = require('jsonwebtoken');

module.exports = {
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
                                    res.status(400).send('You already have a reservation within 2 hours of this match');
                                    return;
                                }
                            });
                        }
                    }
                    else {
                        // Check if seat is available
                        resconnection.getMatchReservations(req.body.match_id).then((result) => {
                            if(req.body.chair_id in result) {
                                res.status(400).send('Seat is already reserved');
                                return;
                            }
                        });
                        // Reserve seat
                        resconnection.insertReservation(req.body).then((result) => {
                            res.status(200).send(result);
                        });
                    }
                });
            }
            // handle conflict
            // ensure not clashing
        }
        catch (err) {
            console.log(err);
        }
};