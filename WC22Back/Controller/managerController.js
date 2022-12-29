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

                refreeconnection.getRefrees().then((refrees) => {
                    for(refree in refrees) {
                        if(refree.id == match.main_ref) {
                            result_details.main_refree = refree.id;
                            break;
                        }
                        else if(refree.id == match.line_man_1) {
                            result_details.line_man_1 = refree.id;
                            break;
                        }
                        else if(refree.id == match.line_man_2) {
                            result_details.line_man_1 = refree.id;
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
            // Check if the teams are not present in a match at the same time
            const matches = await matchconnection.getMatches();
            for(match in matches) {
                if((match.team1 == req.body.team1 || match.team2 == req.body.team1) || (match.team1 == req.body.team2 || match.team2 == req.body.team2))
                {
                    // First split the start time of the match to get the day of the match
                    const match_start_time = match.start_time.split(' ')[0];
                    // Check if the match is on the same day
                    if(match_start_time == req.body.start_time) {
                        console.log('Teams are already playing on the same day');
                        res.status(400).json('Teams are already playing on the same day');
                        return;
                    }   
                }
            }
            console.log(match);
            const match = await matchconnection.insertMatch(req.body);
            res.status(200).json(match.id);
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
    }
}