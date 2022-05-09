INSERT INTO users (name, email, password) 
    VALUES ('Jack Sparrow', 'jack@gmail.com', '1234');
INSERT INTO users (name, email, password, phone) 
    VALUES ('Elizabeth Swan', 'elizabeth@gmail.com', '1234', '9057897733');
INSERT INTO users (name, email, password, phone) 
    VALUES ('Will Turner', 'will@gmail.com', '1234', '9056559483');


INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (3, 'computer', 'A thought provoking piece, showcasing Vasilys ability to find inspiration in even the workplace, "computer" will no doubt be a showcase favorite for many years to come', 4000000, 'https://i.ibb.co/gwGp9mM/Screen-Shot-2022-05-04-at-10-42-01-AM.png');
INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (1, 'worker', 'Vasily demonstrates his admirable values with this piece, paying homage to women and men who work hard to build the physical infastructure of our communities', 2400000, 'https://i.ibb.co/wyT2XpJ/Screen-Shot-2022-05-04-at-11-14-17-AM.png');
INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (1, 'cursed', 'cursed', 10000000, 'https://i.ibb.co/tJmBCtR/Screen-Shot-2022-04-28-at-11-59-02-AM.png');


INSERT INTO favourite_items (user_id, item_id) 
    VALUES (1, 1);
INSERT INTO favourite_items (user_id, item_id) 
    VALUES (3, 2);
INSERT INTO favourite_items (user_id, item_id) 
    VALUES (2, 1);


INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (1, 3, 1, 'Hey this piece is amazing, will you take $37,000?');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (3, 1, 1, 'price is firm.');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (1, 3, 1, 'okay... what about $39,000...');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (3, 1, 1, 'WHAT DID I JUST SAY');