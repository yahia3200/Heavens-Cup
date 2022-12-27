
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


create table users
(
    fname text not null, lname text not null,
    username text not null unique,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email text unique not null,
    userrole int default 0,
    gender int default 0,
    birthdate date not null,
    nationality text,
    hash varchar(255) not null,    

    primary key (id)
);

create table teams
{
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    primary key (id),
    team_name text not null unique,
    image text not null
};

CREATE table referee
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    primary key (id),
    ref_role int not null,
    ref_name text not null unique
);

create table stadiums
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    primary key (id),
    stad_name text not null unique,
    num_rows int not null,
    seats_per_row int not null
    
);

create table matches
(
    team1 uuid not null, team2 uuid not null,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    start_time timestamp not null,
    main_ref uuid not null, line_man_1 uuid not null, line_man_2 uuid not null,
    stad_id uuid not null,
    primary key (id),
    foreign key (stad_id) references stadiums(id),
    foreign key (team1) references teams(id),
    foreign key (team2) references teams(id),
    foreign key (main_ref) references referee(id),
    foreign key (line_man_1) references referee(id),
    foreign key (line_man_2) references referee(id)
);


/* Multivalued Attributes*/

create table reservations
(
    chair_id int not null,
    match_id uuid not null,
    user_id uuid not null,
    primary key (chair_id,match_id),

    foreign key (match_id) references matches(id),
    foreign key (user_id) references users(id)
);
