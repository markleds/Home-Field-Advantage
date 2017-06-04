DROP DATABASE IF EXISTS stadiums_forum;

CREATE DATABASE stadiums_forum;

\c stadiums_forum;

CREATE TABLE stadiums(
  id BIGSERIAL PRIMARY KEY,
  stadium_name VARCHAR(164) NOT NULL,
  stadium_address VARCHAR(255) NOT NULL,
  stadium_website VARCHAR(255) NOT NULL,
  indoor_outdoor_rr VARCHAR(90),
  stadium_description TEXT,
  stadium_image_url VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE teams(
  id BIGSERIAL PRIMARY KEY,
  team_name VARCHAR(164) NOT NULL,
  league VARCHAR(164) NOT NULL,
  team_website VARCHAR(255) NOT NULL,
  team_image_url VARCHAR(255),
  stadium_id INTEGER REFERENCES stadiums(id)
);

CREATE TABLE comments(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  category VARCHAR(90) NOT NULL,
  comment_text TEXT,
  likes INTEGER,
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  stadium_id INTEGER REFERENCES stadiums(id)
);

CREATE INDEX on teams (league);
CREATE INDEX on comments (category);
