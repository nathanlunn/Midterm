INSERT INTO users (name, email, password) 
    VALUES ('Kristen', 'kristen@gmail.com', '1234');
INSERT INTO users (name, email, password, phone) 
    VALUES ('Khurram', 'khurram@gmail.com', '1234', '9057897733');
INSERT INTO users (name, email, password, phone) 
    VALUES ('Francis', 'francis@gmail.com', '1234', '9056559483');


INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (3, 'computer', '"computer" will no doubt be a showcase favorite for many years to come', 40000, 'https://i.ibb.co/gwGp9mM/Screen-Shot-2022-05-04-at-10-42-01-AM.png');
INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (1, 'worker', 'paying homage to women and men who work hard to build the physical infastructure of our communities', 24000, 'https://i.ibb.co/wyT2XpJ/Screen-Shot-2022-05-04-at-11-14-17-AM.png');
INSERT INTO items (owner_id, title, description, price, photo_url) 
    VALUES (1, 'cursed', 'cursed', 900, 'https://i.ibb.co/tJmBCtR/Screen-Shot-2022-04-28-at-11-59-02-AM.png');
INSERT INTO items (owner_id, title, description, price, photo_url, is_featured) 
    VALUES (2, 'less cursed', 'Vasilys take on the mass implementation of the "profile picture", up for interpretation', 5000, 'https://i.ibb.co/S5ZFC1z/Screen-Shot-2022-04-28-at-11-57-00-AM.png', true);
INSERT INTO items (owner_id, title, description, price, photo_url, is_featured) 
    VALUES (3, 'file transfer', 'a completely legal exchange of property', 70000, 'https://i.ibb.co/xXRbT5x/file-transfer.png', true);
INSERT INTO items (owner_id, title, description, price, photo_url, is_featured) 
    VALUES (2, 'cat', 'KITTY!', 99900, 'https://i.ibb.co/vhQsV24/Screen-Shot-2022-05-12-at-5-12-30-PM.png', true);


INSERT INTO favourite_items (user_id, item_id) 
    VALUES (1, 1);
INSERT INTO favourite_items (user_id, item_id) 
    VALUES (3, 6);
INSERT INTO favourite_items (user_id, item_id) 
    VALUES (2, 3);


INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (1, 3, 1, 'Hey this piece is amazing, will you take $370?');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (3, 1, 1, 'price is firm.');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (1, 3, 1, 'okay... what about $390...');
INSERT INTO messages (sender_id, receiver_id, item_id, content)
    VALUES (3, 1, 1, '...');