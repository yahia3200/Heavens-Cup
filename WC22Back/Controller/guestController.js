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
                res.body.match = match;
                teamconnection.getTeams().then((teams) => {
                    for(team in teams) {
                        if(team.id == match.team1_id) {
                            res.body.team1 = team;
                        }
                        else if(team.id == match.team2_id) {
                            res.body.team2 = team;
                        }
                    }
                });

                stadiumconnection.getStads().then((stads) => {
                    for(stad in stads) {
                        if(stad.id == match.stad_id) {
                            res.body.stad = stad;
                            break;
                        }
                    }
                });

                refreeconnection.getReferees().then((referees) => {
                    for(referee in referees) {
                        if(referee.id == match.main_ref) {
                            res.body.main_referee = referee;
                            break;
                        }
                        else if(referee.id == match.line_man_1) {
                            res.body.line_man_1 = referee;
                            break;
                        }
                        else if(referee.id == match.line_man_2) {
                            res.body.line_man_1 = referee;
                            break;
                        }
                    }
                });
                
                res.status(200).json("Match details");
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
                res.status(400).json({ error: 'No stadiums found'});
            }
        } catch (err) {
            res.status(400).json({err: err});
        }
    }
}