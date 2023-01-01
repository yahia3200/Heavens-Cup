const matchconnection = require('../Repositories/match');
const teamconnection = require('../Repositories/team');
const stadiumconnection = require('../Repositories/stadium');
const refereeconnection = require('../Repositories/referee');
const resconnection = require('../Repositories/reservation');
const team = require('../Repositories/team');

module.exports = {
    create_match: async (req, res) => {
        try {
            // Check if the teams are not present in a match on the same day or refrees are not present in a match on the same day or stadium is not reserved on the same day
            const matches = await matchconnection.getMatches();
            // Check if matches are not zero
            if(matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
                // Check if the teams are not present in a match on the same day
                if((matches[i].team1 == req.body.team1 || matches[i].team2 == req.body.team1) ||
                 (matches[i].team1 == req.body.team2 || matches[i].team2 == req.body.team2) ||
                 (matches[i].main_ref == req.body.main_ref) || (matches[i].line_man_1 == req.body.main_ref) || (matches[i].line_man_2 == req.body.main_ref) ||
                 (matches[i].main_ref == req.body.line_man_1) || (matches[i].line_man_1 == req.body.line_man_1) || (matches[i].line_man_2 == req.body.line_man_1) ||
                 (matches[i].main_ref == req.body.line_man_2) || (matches[i].line_man_1 == req.body.line_man_2) || (matches[i].line_man_2 == req.body.line_man_2) ||
                 (matches[i].stad_id == req.body.stad_id))
                {
                    console.log("HELLO555")

                    const matchDate = new Date(matches[i].start_time).toISOString().split('T')[0];
                    const reqDate = new Date(req.body.start_time).toISOString().split('T')[0];
                    
                    // Compare the day of the matches[i] with the day of the new matches[i]
                    if( matchDate == reqDate ) {
                        console.log('There is another match on the same day');
                        res.status(400).json({ error: 'There is another match on the same day'});
                        return;
                    }
                }  
            }
        }
            const match = await matchconnection.insertMatch(req.body);
            res.status(200).json({ id: match.id, message: 'Match created successfully' });
        } catch (err) {
            res.status(400).json({error: "Error creating match"});
        }
    },
    create_stadium: async (req, res) => {
        try {
            const stad = await stadiumconnection.insertStad(req.body);
            res.status(200).json({stad_id: stad.id});
        } catch (err) {
            console.log(err);
            res.status(400).json({error: "Error creating stadium"});
        }
    },
    edit_match: async (req, res) => {
        try {

            const matches = await matchconnection.getMatches();
            // Check if matches are not zero
            if(matches.length != 0) {
                for (let i = 0; i < matches.length; i++) {
                    // Check if the teams are not present in a match on the same day
                    if((matches[i].team1 == req.body.team1 || matches[i].team2 == req.body.team1) ||
                     (matches[i].team1 == req.body.team2 || matches[i].team2 == req.body.team2) ||
                     (matches[i].main_ref == req.body.main_ref) || (matches[i].line_man_1 == req.body.main_ref) || (matches[i].line_man_2 == req.body.main_ref) ||
                     (matches[i].main_ref == req.body.line_man_1) || (matches[i].line_man_1 == req.body.line_man_1) || (matches[i].line_man_2 == req.body.line_man_1) ||
                     (matches[i].main_ref == req.body.line_man_2) || (matches[i].line_man_1 == req.body.line_man_2) || (matches[i].line_man_2 == req.body.line_man_2) ||
                     (matches[i].stad_id == req.body.stad_id))
                    {
                            
                        const matchDate = new Date(matches[i].start_time).toISOString().split('T')[0];
                        const reqDate = new Date(req.body.start_time).toISOString().split('T')[0];
                        
                            
                        // Compare the day of the match with the day of the new match
                        if( matchDate == reqDate  && matches[i].id != req.body.id) {
                            console.log('There is another match on the same day');
                            res.status(405).json({ error: 'There is another match on the same day'});
                            return;
                        }
                    }  
                }
            }
            const match = await matchconnection.updateMatch(req.body);
            res.status(200).json({id: match.id});
        } catch (err) {
            res.status(400).json({error: "Error editing match"});
        }
    }
}