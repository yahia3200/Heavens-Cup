
--  Right a query that Select the match and get the names of teams in it from teams table

SELECT  matches.id, matches.start_time , 
        team1.team_name AS team1_name, team2.team_name AS team2_name, 
        stadiums.stad_name, stadiums.num_rows, stadiums.seats_per_row,
        main_referee.ref_name AS main_ref, lineman1.ref_name AS line_man_1, lineman2.ref_name AS line_man_2
FROM matches
INNER JOIN teams AS team1 ON matches.team1 = team1.id
INNER JOIN teams AS team2 ON matches.team2 = team2.id
INNER JOIN stadiums ON matches.stad_id = stadiums.id
INNER JOIN referee AS main_referee ON matches.main_ref = main_referee.id
INNER JOIN referee AS lineman1 ON matches.line_man_1 = lineman1.id
INNER JOIN referee AS lineman2 ON matches.line_man_2 = lineman2.id
WHERE matches.id = '?';
SELECT  matches.id, matches.start_time , 
        team1.team_name AS team1_name, team2.team_name AS team2_name, 
        stadiums.stad_name
FROM matches
INNER JOIN teams AS team1 ON matches.team1 = team1.id
INNER JOIN teams AS team2 ON matches.team2 = team2.id
INNER JOIN stadiums ON matches.stad_id = stadiums.id;

