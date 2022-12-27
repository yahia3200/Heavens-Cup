const resconnection = require('../Repositories/reservation');
const matchconnection = require('../Repositories/match');

const jwt = require('jsonwebtoken');

module.exports = {
    reserve_ticket : async function (req, res) {
        try {
            const {id} = req.user.id;
            resconnection.getCustomerReservations(id).then((result) => {
                if (result.length > 0) {
                    for(const res in result) {
                        matchconnection.getMatch(res.match_id).then((match) => {
                            
                        });
                    }
                }
                else {
                    
                }
            });
            // handle conflict
            // ensure not clashing
        }
        catch (err) {
            console.log(err);
        }
};