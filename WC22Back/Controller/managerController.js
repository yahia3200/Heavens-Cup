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
            
            matches.forEach(match => {
                if((match.team1 == req.body.team1 || match.team2 == req.body.team1) ||
                 (match.team1 == req.body.team2 || match.team2 == req.body.team2) ||
                 (match.main_ref == req.body.main_ref) || (match.line_man_1 == req.body.main_ref) || (match.line_man_2 == req.body.main_ref) ||
                 (match.main_ref == req.body.line_man_1) || (match.line_man_1 == req.body.line_man_1) || (match.line_man_2 == req.body.line_man_1) ||
                 (match.main_ref == req.body.line_man_2) || (match.line_man_1 == req.body.line_man_2) || (match.line_man_2 == req.body.line_man_2) ||
                 (match.stad_id == req.body.stad_id))
                {
                    
                    const match_date = req.body.start_time;
                    
                    // Compare the day of the match with the day of the new match
                    if( new Date(match_date) == new Date(req.body.start_time) ) {
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
            res.status(400).json({error: err.detail});
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
                    
                    const match_date = req.body.start_time;
                    
                    // Compare the day of the match with the day of the new match
                    if( new Date(match_date) == new Date(req.body.start_time)  && match.id != req.body.id) {
                        console.log('There is another match on the same day');
                        res.status(405).json({ error: 'There is another match on the same day'});
                        return;
                    }
                }  
            });

            const match = await matchconnection.updateMatch(req.body.match);
            res.status(200).json({id: match.id});
        } catch (err) {
            res.status(400).json({error: err.detail});
        }
    }
}