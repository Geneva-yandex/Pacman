CREATE TABLE IF NOT EXISTS topics {
    "id" serial PRIMARY KEY AUTO_INCREMENT,
    "title" varchar(1024) NOT NULL,
    "description" text not null,
    "last_message_txt" text,
    "user_id" int not null unsigned,
}

CREATE TABLE IF NOT EXISTS messages (
    "id" serial PRIMARY KEY AUTO_INCREMENT,
    "title" varchar(1024) NOT NULL,
    "description" text not null,
    "message_id" int unsigned,
    "user_id" int not null unsigned,
    "topic_id" int not null unsigned,
    FOREIGN KEY ("topic_id") REFERENCES topics ("id")
)

CREATE TABLE IF NOT EXISTS user {
    "id" serial PRIMARY KEY AUTO_INCREMENT,
    "user_id" int not null unsigned,
}

CREATE TABLE IF NOT EXISTS site_theme {
    "id" serial PRIMARY KEY AUTO_INCREMENT,
    "name" text not null unsigned,
    "theme" text not null unsigned,
}

CREATE INDEX IF NOT EXISTS index_theme ON site_theme ("name");

CREATE TABLE IF NOT EXISTS user_theme {
    "id" serial PRIMARY KEY AUTO_INCREMENT,
    "theme_id" int not null unsigned,
    "owner_id" int not null unsigned,
    FOREIGN KEY ("theme_id") REFERENCES site_theme ("id"),
    FOREIGN KEY ("owner_id") REFERENCES user ("id")
}
