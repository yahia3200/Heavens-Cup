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
                // Create a new object to hold the match details
                result_details = {};
                teamconnection.getTeams().then((teams) => {
                    for(team in teams) {
                        if(team.id == match.team1) {
                            result_details.team1 = team.id;
                        }
                        else if(team.id == match.team2) {
                            result_details.team2 = team.id;
                        }
                    }
                });

                stadiumconnection.getStads().then((stads) => {
                    for(stad in stads) {
                        if(stad.id == match.stad_id) {
                            result_details.stad = stad.id;
                            break;
                        }
                    }
                });

                refereeconnection.getReferees().then((referees) => {
                    for(referee in referees) {
                        if(referee.id == match.main_ref) {
                            result_details.main_referee = referee.id;
                            break;
                        }
                        else if(referee.id == match.line_man_1) {
                            result_details.line_man_1 = referee.id;
                            break;
                        }
                        else if(referee.id == match.line_man_2) {
                            result_details.line_man_1 = referee.id;
                            break;
                        }
                    }
                });
                
                res.status(200).json(result_details);
            } else {
                res.status(400).json('Match not found');
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
    create_match: async (req, res) => {
        try {
            // Check if the teams are not present in a match on the same day or refrees are not present in a match on the same day or stadium is not reserved on the same day
            const matches = await matchconnection.getMatches();
            // Check if matches are not zero
            if(matches.length != 0) {
            
            matches.forEach(match => {
                if((match.team1 == req.body.team1 || match.team2 == req.body.team1) ||
                 (match.team1 == req.body.team2 || match.team2 == req.body.team2) ||
                 (match.main_ref == req.body.main_ref) || (match.line_man_1 == req.body.main_ref) || (match.line_man_2 == req.body.main_ref) ||
                 (match.main_ref == req.body.line_man_1) || (match.line_man_1 == req.body.line_man_1) || (match.line_man_2 == req.body.line_man_1) ||
                 (match.main_ref == req.body.line_man_2) || (match.line_man_1 == req.body.line_man_2) || (match.line_man_2 == req.body.line_man_2) ||
                 (match.stad_id == req.body.stad_id))
                {
                    
                    const match_date = "";
                    
                    // Compare the day of the match with the day of the new match
                    if(match_date == req.body.start_time) {
                        console.log('There is another match on the same day');
                        res.status(405).json({ error: 'There is another match on the same day'});
                        return;
                    }   
                }                
            });
        }
            console.log('No match on the same day');
            const match = await matchconnection.insertMatch(req.body);
            res.status(200).json({ id: match.id, message: 'Match created successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    create_stadium: async (req, res) => {
        try {
            const stad = await stadiumconnection.insertStad(req.body);
            res.status(200).json({stad_id: stad.id});
        } catch (err) {
            console.log(err);
            res.status(400).json({error: err.detail});
        }
    },
    edit_match: async (req, res) => {
        try {
            const match = await matchconnection.updateMatch(req.body.match);
            res.status(200).json(match.id);
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    get_all_matches: async (req, res) => {
        try {
            const matches = await matchconnection.getMatches();
            res.status(200).json(matches);
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    },
    get_all_stadiums: async (req, res) => {
        try {
            const stads = await stadiumconnection.getStads();
            res.status(200).json(stads);
        } catch (err) {
            res.status(400).json({error: err.detail});
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
                res.status(200).json(reservations);
            }
            else {
                res.status(400).json('No reservations found');
            }
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    }
}