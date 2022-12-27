
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



create table stadium
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    primary key (id),
    stad_name text not null unique,
    num_rows int not null,
    seats_per_row int not null
    
);

create table matches
(
    team1 text not null, team2 text not null,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    start_time timestamp not null,
    main_ref text not null, line_man_1 text not null, line_man_2 text not null,
    stadium text not null unique,
    stad_id uuid not null,
    primary key (id),
    foreign key (stad_id) references stadium(id)
);


/* Multivalued Attributes*/

create table reservations
(
    chair_id uuid not null,
    match_id uuid not null,
    user_id uuid not null,
    primary key (chair_id,match_id),

    foreign key (match_id) references matches(id),
    foreign key (user_id) references users(id)
);
