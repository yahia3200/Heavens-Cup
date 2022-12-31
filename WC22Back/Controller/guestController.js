const matchconnection = require('../Repositories/match');
const teamconnection = require('../Repositories/team');
const stadiumconnection = require('../Repositories/stadium');
const refreeconnection = require('../Repositories/referee');
const team = require('../Repositories/team');

module.exports = {
    view_match_details: async (req, res) => {
        try {
            const match = await matchconnection.getMatch(req.body.id);
            if(match) {                
                res.status(200).json({message: "Match details", match: match});
            } else {
                res.status(400).json('Match not found');
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
    get_all_stadiums: async (req, res) => {
        try {
            const stads = await stadiumconnection.getStads();
            if(stads) {
                res.status(200).json({stads: stads});
            } else {
                console.log(stads);
                res.status(400).json({ error: 'No stadiums found'});
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({err: err.detail});
        }
    }
}