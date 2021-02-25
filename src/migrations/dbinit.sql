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
    "user_id" int not null unsigned,
    "topic_id" int not null unsigned,
    FOREIGN KEY ("topic_id") REFERENCES topics ("id")
)
