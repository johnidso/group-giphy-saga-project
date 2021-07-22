CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

-- Creating table for tables
CREATE TABLE favorites (
	"id" SERIAL PRIMARY KEY,
	"url" varchar(250),
	"category" varchar (250)
);

INSERT INTO favorites ("url", "category")
			VALUES ('https://media.giphy.com/media/lz67zZWfWPsWnuGH0s/giphy.gif', 'funny');