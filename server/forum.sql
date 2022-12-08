--CREATE DATABASE myforum;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS topic(
topic_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
topic_name VARCHAR(32) NOT NULL,
description TEXT NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS subtopic(
subtopic_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
subtopic_name VARCHAR(32) NOT NULL,
topic_id INT NOT NULL,
description TEXT NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS profile(
profile_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
cipher TEXT NOT NULL,
avatar TEXT DEFAULT 'public/images/default.png',
profile_name VARCHAR(64) NOT NULL,
profile_role VARCHAR(16), 
is_verified BOOLEAN NOT NULL,
nickname VARCHAR(32) UNIQUE NOT NULL,
email VARCHAR(128) UNIQUE NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS reply(
reply_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
post_id INT NOT NULL,
profile_id uuid NOT NULL,
parent_id INT,
message VARCHAR(2000) NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS post(
post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
profile_id uuid NOT NULL,
subtopic_id INT NOT NULL,
message VARCHAR(2000) NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS file(
file_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
post_id INT,
reply_id INT,
file_path TEXT NOT NULL
--CONSTRAINT null_check_file CHECK ((post_id IS NULL AND reply_id IS NOT NULL) OR (post_id IS NOT NULL AND reply_id IS NULL))
);
-- FOREIGN KEYS
ALTER TABLE post ADD FOREIGN KEY(profile_id) REFERENCES profile(profile_id);
ALTER TABLE post ADD FOREIGN KEY(subtopic_id) REFERENCES subtopic(subtopic_id);
ALTER TABLE reply ADD FOREIGN KEY(post_id) REFERENCES post(post_id);
ALTER TABLE reply ADD FOREIGN KEY(profile_id) REFERENCES profile(profile_id);
-- ALTER TABLE profile ADD FOREIGN KEY(avatar) REFERENCES file(file_id);
ALTER TABLE file ADD FOREIGN KEY(post_id) REFERENCES post(post_id);
ALTER TABLE file ADD FOREIGN KEY(reply_id) REFERENCES reply(reply_id);
ALTER TABLE subtopic ADD FOREIGN KEY(topic_id) REFERENCES topic(topic_id);
-- INSERT USERS
insert into profile (profile_id, cipher, profile_name, avatar, profile_role, is_verified, nickname, email) VALUES('fa46db13-1582-46c6-a891-60f9cc4ac7cc','senha', 'chud', null, 'user', false, 'gigachud1488', 'chud@chudmail.ywnbaw.com');
insert into profile (profile_id, cipher, profile_name, avatar, profile_role, is_verified, nickname, email) VALUES('1bce5f66-19b0-451d-8cf9-db46c31b9700','senha', 'chuck', null, 'user', false, 'sneed', 'chuck@chuckmail.ywnbaw.com');
-- INSERT TOPICS
insert into topic (topic_name, description) values ('Video Games','Para falar sobre jogos, com exceção de qualquer assunto relacionado ao playstation, snoys não são bem vindos.');
insert into topic (topic_name, description) values ('Cotidiano','Assuntos Diversos.');
-- INSERT SUBTOPICS
insert into subtopic (subtopic_name, topic_id, description) values ('ROBOT 10k', 2,'Para falar sobre solidão, tristeza e autismo, normalfags e mulheres não são bem vindos.');
insert into subtopic (subtopic_name, topic_id, description) values ('Xbox', 1,'Tudo sobre xbox.');
insert into subtopic (subtopic_name, topic_id, description) values ('Steam', 1,'Tudo relacionado a steam.');
insert into subtopic (subtopic_name, topic_id, description) values ('Epic', 1,'Tudo relacionado a epic store.');
-- INSERT POSTS
insert into post (profile_id, subtopic_id, message) values ('fa46db13-1582-46c6-a891-60f9cc4ac7cc', '1', 'post 1');
insert into post (profile_id, subtopic_id, message) values ('fa46db13-1582-46c6-a891-60f9cc4ac7cc', '1', 'post 2');
insert into post (profile_id, subtopic_id, message) values ('fa46db13-1582-46c6-a891-60f9cc4ac7cc', '2', 'post 3');
insert into post (profile_id, subtopic_id, message) values ('1bce5f66-19b0-451d-8cf9-db46c31b9700', '3', 'post 4');
insert into post (profile_id, subtopic_id, message) values ('1bce5f66-19b0-451d-8cf9-db46c31b9700', '3', 'post 5');
insert into post (profile_id, subtopic_id, message) values ('1bce5f66-19b0-451d-8cf9-db46c31b9700', '1', 'post 6');
insert into post (profile_id, subtopic_id, message) values ('1bce5f66-19b0-451d-8cf9-db46c31b9700', '4', 'post 7');
-- INSERT REPLIES
insert into reply (post_id, profile_id, parent_id, message) values (1,'1bce5f66-19b0-451d-8cf9-db46c31b9700', null,'reply to post 1');
insert into reply (post_id, profile_id, parent_id, message) values (1, 'fa46db13-1582-46c6-a891-60f9cc4ac7cc', null,'second reply to post 1');
insert into reply (post_id, profile_id, parent_id, message) values (1,'fa46db13-1582-46c6-a891-60f9cc4ac7cc', 2,'reply to reply 1');
insert into reply (post_id, profile_id, parent_id, message) values (1,'fa46db13-1582-46c6-a891-60f9cc4ac7cc', 3,'reply to reply 2');
insert into reply (post_id, profile_id, parent_id, message) values (1,'fa46db13-1582-46c6-a891-60f9cc4ac7cc', 4,'reply to reply 3');
insert into reply (post_id, profile_id, parent_id, message) values (1, '1bce5f66-19b0-451d-8cf9-db46c31b9700', 4,'second reply to reply 3');
insert into reply (post_id, profile_id, parent_id, message) values (2, '1bce5f66-19b0-451d-8cf9-db46c31b9700', null,'reply to post 2');
insert into reply (post_id, profile_id, parent_id, message) values (2, 'fa46db13-1582-46c6-a891-60f9cc4ac7cc', null,'second reply to post 2');
insert into reply (post_id, profile_id, parent_id, message) values (2,'1bce5f66-19b0-451d-8cf9-db46c31b9700', null,'third to post 2');
