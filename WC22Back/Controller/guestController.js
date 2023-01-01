const matchconnection = require('../Repositories/match');
const teamconnection = require('../Repositories/team');
const stadiumconnection = require('../Repositories/stadium');
const refereeconnection = require('../Repositories/referee');
const resconnection = require('../Repositories/reservation');
const team = require('../Repositories/team');

module.exports = {
    view_match_details: async (req, res) => {
        try {
            const match = await matchconnection.getMatch(req.body.id);
            if(match) {
                const reservations = await resconnection.getMatchReservations(req.body.id);
                res.status(200).json({message: "Match details", match: match, reservations: reservations});
            } else {
                res.status(400).json({error: 'Match not found'});
            }
        } catch (err) {
            res.status(400).json({error: err});
        }
    },
    get_all_matches: async (req, res) => {
        try {
            const matches = await matchconnection.getMatches();
            res.status(200).json({matches: matches});
        } catch (err) {
            res.status(400).json({error: err.detail});
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
    },
    get_all_refrees: async (req, res) => {
        try {
            const referees = await refereeconnection.getReferees();
            res.status(200).json({referees: referees});
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    get_all_teams: async (req, res) => {
        try {
            const teams = await teamconnection.getTeams();
            res.status(200).json({teams: teams});
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    get_match_reservations: async (req, res) => {
        try {
            const reservations = await resconnection.getMatchReservations(req.body.id);
            if(reservations) {
                res.status(200).json({reservations: reservations});
            }
            else {
                res.status(400).json({error: 'No reservations found'});
            }
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    }
}