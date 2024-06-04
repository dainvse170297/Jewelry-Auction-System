/*
+------------------------------+-------+
| Name                         | Size  |
+------------------------------+-------+
| role                         |     3 |
| credit_card                  |    10 |
| member                       |    10 |
| notify                       |    10 |
| account                      |    20 |
| staff                        |    10 |
| valuation_request            |    35 |
| valuation_image              |    50 |
| response_request_valuation   |    25 |
| category                     |     5 |
| product                      |    20 |
| product_image                |    40 |
| auction_session              |    20 |
| lot                          |     5 |
| financial_proof_request      |     0 |
| financial_proof_image        |     0 |
| bid                          |     0 |
| auction_register             |     0 |
+------------------------------+-------+
*/

USE jewelryauction;

-- Insert to role 
INSERT INTO jewelryauction.role (description, name) VALUES
('Default description for MEMBER 1', 'MEMBER'),
('Default description for STAFF 1', 'STAFF'),
('Default description for MANAGER 1', 'MANAGER');

-- Insert to Creditcard
INSERT INTO jewelryauction.credit_card (account_holder, bank_name, bank_number) VALUES
('John Doe', 'Bank of America', '1234-5678-9012-3456'),
('Jane Smith', 'Chase', '2345-6789-0123-4567'),
('Alice Johnson', 'Wells Fargo', '3456-7890-1234-5678'),
('Bob Brown', 'Citi', '4567-8901-2345-6789'),
('Charlie Davis', 'Capital One', '5678-9012-3456-7890'),
('David Wilson', 'Discover', '6789-0123-4567-8901'),
('Eve White', 'American Express', '7890-1234-5678-9012'),
('Frank Harris', 'HSBC', '8901-2345-6789-0123'),
('Grace Lee', 'PNC', '9012-3456-7890-1234'),
('Henry Martin', 'US Bank', '0123-4567-8901-2345');

-- Insert to Member
INSERT INTO jewelryauction.member (address, email, financial_proof_amount, fullname, phone, credit_card_credit_card_id) VALUES
('123 Main St, Los Angeles, CA 90001', 'john.doe@example.com', 50000.0, 'John Doe', '2134567890', 1),
('456 Elm St, New York, NY 10001', 'jane.smith@example.com', 75000.0, 'Jane Smith', '6465678901', 2),
('789 Oak St, Chicago, IL 60601', 'alice.johnson@example.com', 30000.0, 'Alice Johnson', '3126789012', 3),
('101 Maple St, Houston, TX 77001', 'bob.brown@example.com', 45000.0, 'Bob Brown', '7137890123', 4),
('202 Pine St, Phoenix, AZ 85001', 'charlie.davis@example.com', 60000.0, 'Charlie Davis', '6028901234', 5),
('303 Cedar St, Philadelphia, PA 19101', 'david.wilson@example.com', 52000.0, 'David Wilson', '2159012345', 6),
('404 Birch St, San Antonio, TX 78201', 'eve.white@example.com', 67000.0, 'Eve White', '2100123456', 7),
('505 Willow St, San Diego, CA 92101', 'frank.harris@example.com', 33000.0, 'Frank Harris', '6191234567', 8),
('606 Aspen St, Dallas, TX 75201', 'grace.lee@example.com', 49000.0, 'Grace Lee', '2142345678', 9),
('707 Redwood St, San Jose, CA 95101', 'henry.martin@example.com', 41000.0, 'Henry Martin', '4083456789', 10);

-- Insert to staff
INSERT INTO jewelryauction.staff (staff_id) VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10);

-- Insert to notify
INSERT INTO jewelryauction.notify (date, description, title, member_id) VALUES
('2024-01-01', 'Welcome to our service!', 'Welcome', 1),
('2024-02-14', 'Your account has been updated.', 'Account Update', 2),
('2024-03-21', 'Your subscription has been renewed.', 'Subscription Renewal', 3),
('2024-04-10', 'Your payment has been received.', 'Payment Confirmation', 4),
('2024-05-15', 'Your profile has been successfully updated.', 'Profile Update', 5),
('2024-06-01', 'Your new benefits have been added.', 'New Benefits', 6),
('2024-07-04', 'Important security update.', 'Security Update', 7),
('2024-08-19', 'New features have been released.', 'New Features', 8),
('2024-09-25', 'Your membership has been upgraded.', 'Membership Upgrade', 9),
('2024-10-30', 'Happy holidays! Special offers inside.', 'Holiday Offers', 10);

-- Insert to account
INSERT INTO account (create_date, password, username, members_member_id, role_id, staff_staff_id) VALUES
-- Member accounts
('2023-04-15', '12345', 'JohnDoe', 1, 1, NULL),
('2022-12-01', 'Ab1!2Cd3@4', 'JaneSmith', 2, 1, NULL),
('2022-11-21', 'Ef5#6Gh7$8', 'EmilyJohnson', 3, 1, NULL),
('2023-01-19', 'Ij9^0Kl1%2', 'MichaelBrown', 4, 1, NULL),
('2023-03-10', 'Mn3*4Op5(6', 'WilliamDavis', 5, 1, NULL),
('2023-05-05', 'Qr7&8St9)0', 'MaryMiller', 6, 1, NULL),
('2022-10-30', 'Uv1_2Wx3+4', 'PatriciaWilson', 7, 1, NULL),
('2023-02-25', 'Yz5=6Ab7[8', 'RobertMoore', 8, 1, NULL),
('2023-04-08', 'Cd9]0Ef1{2', 'LindaTaylor', 9, 1, NULL),
('2022-09-15', 'Gh3|4Ij5}6', 'DavidAnderson', 10, 1, NULL),
-- Staff accounts
('2023-01-14', 'Kl7~8Mn9`0', 'RichardHarris', NULL, 2, 1),
('2022-11-02', 'Op1!2Qr3#4', 'JosephClark', NULL, 2, 2),
('2023-03-27', 'St5$6Uv7%8', 'SusanLewis', NULL, 2, 3),
('2022-12-10', 'Wx9^0Yz1&2', 'ThomasWalker', NULL, 2, 4),
('2023-04-18', 'Ab3*4Cd5(6', 'SarahHall', NULL, 2, 5),
('2023-05-25', 'Ef7)8Gh9_0', 'MargaretYoung', NULL, 2, 6),
('2022-10-07', 'Ij1+2Kl3=4', 'JessicaKing', NULL, 2, 7),
('2023-02-13', 'Mn5[6Op7]8', 'CharlesWright', NULL, 2, 8),
('2023-04-30', 'Qr9{0St1|2', 'DanielScott', NULL, 2, 9),
('2022-09-22', 'Uv3}4Wx5~6', 'NancyGreen', NULL, 2, 10);

-- Insert to category
INSERT INTO jewelryauction.category (description, name) VALUES
('Beautifully crafted necklaces with various designs', 'Necklaces'),
('Elegant and exquisite rings for all occasions', 'Rings'),
('Stylish and timeless bracelets', 'Bracelets'),
('Charming and dazzling earrings', 'Earrings'),
('Intricately designed pendants', 'Pendants');

-- Insert to product
INSERT INTO jewelryauction.product (description, estimate_price_max, estimate_price_min, name, category_id) VALUES
('A stunning gold necklace with a heart-shaped pendant.', 5000.0, 3000.0, 'Heart Gold Necklace', 3),
('A classic diamond ring set in white gold.', 10000.0, 8000.0, 'Diamond Ring', 2),
('A delicate silver bracelet with floral motifs.', 4000.0, 2000.0, 'Floral Silver Bracelet', 5),
('Elegant pearl earrings with gold accents.', 6000.0, 4000.0, 'Pearl Earrings', 1),
('A charming gold pendant with an intricate design.', 7000.0, 5000.0, 'Intricate Gold Pendant', 4),
('A vintage necklace featuring an emerald centerpiece.', 15000.0, 12000.0, 'Emerald Vintage Necklace', 2),
('A sapphire ring surrounded by small diamonds.', 9000.0, 7000.0, 'Sapphire Diamond Ring', 1),
('A contemporary bracelet with cubic zirconia.', 5000.0, 3000.0, 'Zirconia Bracelet', 5),
('Classic hoop earrings made of sterling silver.', 3000.0, 1500.0, 'Silver Hoop Earrings', 4),
('A platinum pendant with a small ruby.', 8000.0, 6000.0, 'Ruby Platinum Pendant', 3),
('A gold chain necklace with a teardrop diamond pendant.', 12000.0, 9000.0, 'Teardrop Diamond Necklace', 2),
('A rose gold ring with an opal stone.', 7000.0, 5000.0, 'Opal Rose Gold Ring', 1),
('A handcrafted bracelet with turquoise beads.', 4000.0, 2500.0, 'Turquoise Bead Bracelet', 3),
('Elegant drop earrings with blue topaz.', 6000.0, 4500.0, 'Topaz Drop Earrings', 5),
('A pendant featuring a moonstone set in silver.', 5000.0, 3500.0, 'Moonstone Silver Pendant', 2),
('A choker necklace adorned with small diamonds.', 14000.0, 10000.0, 'Diamond Choker Necklace', 4),
('A gold band ring with a unique twist design.', 8000.0, 6000.0, 'Twist Gold Band Ring', 1),
('A bangle bracelet made of pure gold.', 10000.0, 7000.0, 'Pure Gold Bangle', 3),
('Elegant stud earrings with small emeralds.', 5000.0, 3000.0, 'Emerald Stud Earrings', 5),
('A pendant with a large aquamarine stone.', 12000.0, 9000.0, 'Aquamarine Pendant', 2);

-- Insert to response_request_valuation
INSERT INTO jewelryauction.response_request_valuation (status, time_response, valuation_price, staff_id) VALUES
('ACCEPTED', '2023-11-15', 12000.00, 3),
('FINAL', '2023-10-20', 15000.00, 5),
('PRELIMINARY', '2023-09-25', 10000.00, 7),
('REJECTED', '2023-08-10', 8000.00, 2),
('ACCEPTED', '2023-07-05', 14000.00, 4),
('FINAL', '2023-06-30', 18000.00, 6),
('PRELIMINARY', '2023-05-20', 9000.00, 8),
('REJECTED', '2023-04-15', 7000.00, 1),
('ACCEPTED', '2023-03-10', 16000.00, 9),
('FINAL', '2023-02-25', 20000.00, 10),
('PRELIMINARY', '2023-01-30', 9500.00, 3),
('REJECTED', '2022-12-15', 8500.00, 2),
('ACCEPTED', '2022-11-10', 17500.00, 5),
('FINAL', '2022-10-05', 22000.00, 6),
('PRELIMINARY', '2022-09-25', 10500.00, 7),
('REJECTED', '2022-08-15', 6000.00, 8),
('ACCEPTED', '2022-07-10', 12500.00, 1),
('FINAL', '2022-06-05', 19000.00, 9),
('PRELIMINARY', '2022-05-30', 11000.00, 4),
('REJECTED', '2022-04-20', 5500.00, 10),
('ACCEPTED', '2022-03-10', 13500.00, 3),
('FINAL', '2022-02-05', 20500.00, 5),
('PRELIMINARY', '2022-01-25', 11500.00, 6),
('REJECTED', '2021-12-10', 6500.00, 7),
('ACCEPTED', '2021-11-15', 14500.00, 8);


-- Insert to valuation_request
INSERT INTO jewelryauction.valuation_request (description, estimate_price_max, estimate_price_min, time_request, valuation_status, member_id, product_id, response_id) VALUES
('Vintage gold necklace with intricate floral design', 10000.0, 5000.0, '2024-01-01', 'MANAGER_APPROVED', 1, 8, 1),
('Elegant diamond engagement ring with a 1-carat solitaire', 15000.0, 7000.0, '2024-01-02', 'MANAGER_APPROVED', 2, 12, 2),
('Antique silver bracelet with gemstone inlays', 20000.0, 10000.0, '2024-01-03', 'MANAGER_APPROVED', 3, 5, 3),
('Platinum wedding band set with small diamonds', 25000.0, 12000.0, '2024-01-04', 'MANAGER_APPROVED', 4, 14, 4),
('Luxury gold watch with sapphire crystal', 30000.0, 15000.0, '2024-01-05', 'MANAGER_APPROVED', 5, 18, 5),
('Custom-made gold pendant with initials and diamonds', 5000.0, 2000.0, '2024-01-06', 'MEMBER_ACCEPTED', 6, 1, 6),
('Ruby and diamond studded brooch', 7000.0, 3000.0, '2024-01-07', 'MEMBER_ACCEPTED', 7, 9, 7),
('Handcrafted pearl necklace with gold clasp', 9000.0, 4000.0, '2024-01-08', 'MEMBER_ACCEPTED', 8, 16, 8),
('Vintage sapphire ring with intricate details', 11000.0, 5000.0, '2024-01-09', 'MEMBER_ACCEPTED', 9, 19, 9),
('Designer diamond earrings with platinum setting', 13000.0, 6000.0, '2024-01-10', 'MEMBER_ACCEPTED', 10, 3, 10),
('Elegant emerald necklace with gold chain', 8000.0, 4000.0, '2024-01-11', 'PENDING_MANAGER_APPROVAL', 1, 15, 11),
('Vintage gold cufflinks with mother of pearl', 12000.0, 6000.0, '2024-01-12', 'PENDING_MANAGER_APPROVAL', 2, 4, 12),
('Art deco diamond bracelet with sapphire accents', 16000.0, 8000.0, '2024-01-13', 'PENDING_MANAGER_APPROVAL', 3, 20, 13),
('Handcrafted silver ring with turquoise stone', 20000.0, 10000.0, '2024-01-14', 'PENDING_MANAGER_APPROVAL', 4, 7, 14),
('Classic gold chain with diamond pendant', 24000.0, 12000.0, '2024-01-15', 'PENDING_MANAGER_APPROVAL', 5, 10, 15),
('Luxury diamond necklace with platinum chain', 6000.0, 3000.0, '2024-01-16', 'PENDING_MEMBER_ACCEPTANCE', 6, 13, 16),
('Gold bracelet with intricate woven design', 8000.0, 4000.0, '2024-01-17', 'PENDING_MEMBER_ACCEPTANCE', 7, 2, 17),
('Sapphire earrings with diamond accents', 10000.0, 5000.0, '2024-01-18', 'PENDING_MEMBER_ACCEPTANCE', 8, 17, 18),
('Antique cameo brooch set in gold', 12000.0, 6000.0, '2024-01-19', 'PENDING_MEMBER_ACCEPTANCE', 9, 6, 19),
('Ruby and diamond cocktail ring', 14000.0, 7000.0, '2024-01-20', 'PENDING_MEMBER_ACCEPTANCE', 10, 11, 20),
('Heirloom pearl necklace with gold clasp', 4000.0, 2000.0, '2024-01-21', 'PRELIMINARY_VALUATED', 1, NULL, 21),
('Gold ring with jade stone', 6000.0, 3000.0, '2024-01-22', 'PRELIMINARY_VALUATED', 2, NULL, 22),
('Artisan silver pendant with intricate engraving', 8000.0, 4000.0, '2024-01-23', 'PRELIMINARY_VALUATED', 3, NULL, 23),
('Vintage amethyst ring with diamond accents', 10000.0, 5000.0, '2024-01-24', 'PRELIMINARY_VALUATED', 4, NULL, 24),
('Luxury gold watch with diamond bezel', 12000.0, 6000.0, '2024-01-25', 'PRELIMINARY_VALUATED', 5, NULL, 25),
('Designer silver bracelet with onyx stones', 5000.0, 2500.0, '2024-01-26', 'PRODUCT_RECEIVED', 6, NULL, NULL),
('Handcrafted gold ring with opal stone', 7000.0, 3500.0, '2024-01-27', 'PRODUCT_RECEIVED', 7, NULL, NULL),
('Antique gold pocket watch', 9000.0, 4500.0, '2024-01-28', 'PRODUCT_RECEIVED', 8, NULL, NULL),
('Vintage diamond and emerald earrings', 11000.0, 5500.0, '2024-01-29', 'PRODUCT_RECEIVED', 9, NULL, NULL),
('Luxury platinum ring with diamonds', 13000.0, 6500.0, '2024-01-30', 'PRODUCT_RECEIVED', 10, NULL, NULL),
('Vintage gold brooch with emerald', 6000.0, 3000.0, '2024-01-31', 'REQUESTED', 1, NULL, NULL),
('Gold and pearl pendant necklace', 8000.0, 4000.0, '2024-02-01', 'REQUESTED', 2, NULL, NULL),
('Silver bracelet with amethyst stones', 10000.0, 5000.0, '2024-02-02', 'REQUESTED', 3, NULL, NULL),
('Gold ring with intricate design', 12000.0, 6000.0, '2024-02-03', 'REQUESTED', 4, NULL, NULL),
('Platinum necklace with diamond pendant', 14000.0, 7000.0, '2024-02-04', 'REQUESTED', 5, NULL, NULL);

-- Insert to valuation_image
INSERT INTO jewelryauction.valuation_image (image_id, image_url, request_id) VALUES
('IMG001', 'http://example.com/images/img001.jpg', 1),
('IMG002', 'http://example.com/images/img002.jpg', 2),
('IMG003', 'http://example.com/images/img003.jpg', 3),
('IMG004', 'http://example.com/images/img004.jpg', 4),
('IMG005', 'http://example.com/images/img005.jpg', 5),
('IMG006', 'http://example.com/images/img006.jpg', 6),
('IMG007', 'http://example.com/images/img007.jpg', 7),
('IMG008', 'http://example.com/images/img008.jpg', 8),
('IMG009', 'http://example.com/images/img009.jpg', 9),
('IMG010', 'http://example.com/images/img010.jpg', 10),
('IMG011', 'http://example.com/images/img011.jpg', 11),
('IMG012', 'http://example.com/images/img012.jpg', 12),
('IMG013', 'http://example.com/images/img013.jpg', 13),
('IMG014', 'http://example.com/images/img014.jpg', 14),
('IMG015', 'http://example.com/images/img015.jpg', 15),
('IMG016', 'http://example.com/images/img016.jpg', 16),
('IMG017', 'http://example.com/images/img017.jpg', 17),
('IMG018', 'http://example.com/images/img018.jpg', 18),
('IMG019', 'http://example.com/images/img019.jpg', 19),
('IMG020', 'http://example.com/images/img020.jpg', 20),
('IMG021', 'http://example.com/images/img021.jpg', 21),
('IMG022', 'http://example.com/images/img022.jpg', 22),
('IMG023', 'http://example.com/images/img023.jpg', 23),
('IMG024', 'http://example.com/images/img024.jpg', 24),
('IMG025', 'http://example.com/images/img025.jpg', 25),
('IMG026', 'http://example.com/images/img026.jpg', 26),
('IMG027', 'http://example.com/images/img027.jpg', 27),
('IMG028', 'http://example.com/images/img028.jpg', 28),
('IMG029', 'http://example.com/images/img029.jpg', 29),
('IMG030', 'http://example.com/images/img030.jpg', 30),
('IMG031', 'http://example.com/images/img031.jpg', 31),
('IMG032', 'http://example.com/images/img032.jpg', 32),
('IMG033', 'http://example.com/images/img033.jpg', 33),
('IMG034', 'http://example.com/images/img034.jpg', 34),
('IMG035', 'http://example.com/images/img035.jpg', 35),
('IMG036', 'http://example.com/images/img036.jpg', 1),
('IMG037', 'http://example.com/images/img037.jpg', 2),
('IMG038', 'http://example.com/images/img038.jpg', 3),
('IMG039', 'http://example.com/images/img039.jpg', 4),
('IMG040', 'http://example.com/images/img040.jpg', 5),
('IMG041', 'http://example.com/images/img041.jpg', 6),
('IMG042', 'http://example.com/images/img042.jpg', 7),
('IMG043', 'http://example.com/images/img043.jpg', 8),
('IMG044', 'http://example.com/images/img044.jpg', 9),
('IMG045', 'http://example.com/images/img045.jpg', 10),
('IMG046', 'http://example.com/images/img046.jpg', 11),
('IMG047', 'http://example.com/images/img047.jpg', 12),
('IMG048', 'http://example.com/images/img048.jpg', 13),
('IMG049', 'http://example.com/images/img049.jpg', 14),
('IMG050', 'http://example.com/images/img050.jpg', 15);

-- Insert to product_image
INSERT INTO jewelryauction.product_image (default_image, image_url, product_id) VALUES
('http://example.com/images/default.jpg', 'http://example.com/images/img001.jpg', 5),
('http://example.com/images/default.jpg', 'http://example.com/images/img002.jpg', 17),
('http://example.com/images/default.jpg', 'http://example.com/images/img003.jpg', 3),
('http://example.com/images/default.jpg', 'http://example.com/images/img004.jpg', 19),
('http://example.com/images/default.jpg', 'http://example.com/images/img005.jpg', 7),
('http://example.com/images/default.jpg', 'http://example.com/images/img006.jpg', 12),
('http://example.com/images/default.jpg', 'http://example.com/images/img007.jpg', 8),
('http://example.com/images/default.jpg', 'http://example.com/images/img008.jpg', 14),
('http://example.com/images/default.jpg', 'http://example.com/images/img009.jpg', 2),
('http://example.com/images/default.jpg', 'http://example.com/images/img010.jpg', 16),
('http://example.com/images/default.jpg', 'http://example.com/images/img011.jpg', 9),
('http://example.com/images/default.jpg', 'http://example.com/images/img012.jpg', 1),
('http://example.com/images/default.jpg', 'http://example.com/images/img013.jpg', 11),
('http://example.com/images/default.jpg', 'http://example.com/images/img014.jpg', 6),
('http://example.com/images/default.jpg', 'http://example.com/images/img015.jpg', 20),
('http://example.com/images/default.jpg', 'http://example.com/images/img016.jpg', 4),
('http://example.com/images/default.jpg', 'http://example.com/images/img017.jpg', 10),
('http://example.com/images/default.jpg', 'http://example.com/images/img018.jpg', 15),
('http://example.com/images/default.jpg', 'http://example.com/images/img019.jpg', 13),
('http://example.com/images/default.jpg', 'http://example.com/images/img020.jpg', 18),
('http://example.com/images/default.jpg', 'http://example.com/images/img021.jpg', 3),
('http://example.com/images/default.jpg', 'http://example.com/images/img022.jpg', 14),
('http://example.com/images/default.jpg', 'http://example.com/images/img023.jpg', 5),
('http://example.com/images/default.jpg', 'http://example.com/images/img024.jpg', 11),
('http://example.com/images/default.jpg', 'http://example.com/images/img025.jpg', 2),
('http://example.com/images/default.jpg', 'http://example.com/images/img026.jpg', 19),
('http://example.com/images/default.jpg', 'http://example.com/images/img027.jpg', 6),
('http://example.com/images/default.jpg', 'http://example.com/images/img028.jpg', 17),
('http://example.com/images/default.jpg', 'http://example.com/images/img029.jpg', 8),
('http://example.com/images/default.jpg', 'http://example.com/images/img030.jpg', 13),
('http://example.com/images/default.jpg', 'http://example.com/images/img031.jpg', 10),
('http://example.com/images/default.jpg', 'http://example.com/images/img032.jpg', 16),
('http://example.com/images/default.jpg', 'http://example.com/images/img033.jpg', 12),
('http://example.com/images/default.jpg', 'http://example.com/images/img034.jpg', 4),
('http://example.com/images/default.jpg', 'http://example.com/images/img035.jpg', 9),
('http://example.com/images/default.jpg', 'http://example.com/images/img036.jpg', 15),
('http://example.com/images/default.jpg', 'http://example.com/images/img037.jpg', 7),
('http://example.com/images/default.jpg', 'http://example.com/images/img038.jpg', 18),
('http://example.com/images/default.jpg', 'http://example.com/images/img039.jpg', 20),
('http://example.com/images/default.jpg', 'http://example.com/images/img040.jpg', 1);

-- Insert to auction_session
INSERT INTO jewelryauction.auction_session (description, end_time, name, start_time, starting_bid, status, staff_id) VALUES
-- 3 CREATED
('Antique Jewelry Auction - Ready to go live', '2024-12-30', 'Antique Auction', '2024-12-25', '2024-12-01', 'CREATED', 1),
('Rare Gemstones Collection Auction', '2024-11-15', 'Gemstones Auction', '2024-11-10', '2024-11-01', 'CREATED', 3),
('Exclusive Diamond Rings Auction', '2024-10-20', 'Diamond Rings Auction', '2024-10-15', '2024-10-01', 'CREATED', 2),
-- 7 UPCOMING
('Luxury Watches Auction', '2024-12-10', 'Watches Auction', '2024-12-05', '2024-11-25', 'UPCOMING', 5),
('Designer Necklaces Auction', '2024-11-30', 'Necklaces Auction', '2024-11-25', '2024-11-10', 'UPCOMING', 7),
('Gold Earrings Auction', '2024-12-25', 'Earrings Auction', '2024-12-20', '2024-12-01', 'UPCOMING', 8),
('Vintage Brooches Auction', '2024-11-20', 'Brooches Auction', '2024-11-15', '2024-11-01', 'UPCOMING', 6),
('Platinum Bracelets Auction', '2024-10-25', 'Bracelets Auction', '2024-10-20', '2024-10-05', 'UPCOMING', 4),
('Exclusive Jewelry Sets Auction', '2024-12-15', 'Jewelry Sets Auction', '2024-12-10', '2024-11-20', 'UPCOMING', 10),
('Silver Rings Auction', '2024-11-05', 'Rings Auction', '2024-11-01', '2024-10-15', 'UPCOMING', 9),
-- 1 LIVE
('Contemporary Jewelry Auction - Live Now', '2024-06-30', 'Contemporary Auction', '2024-05-01', '2024-04-01', 'LIVE', 1),
-- 9 PAST
('Spring Jewelry Auction', '2024-04-30', 'Spring Auction', '2024-04-01', '2024-03-01', 'PAST', 2),
('Winter Jewelry Auction', '2024-03-20', 'Winter Auction', '2024-03-01', '2024-02-10', 'PAST', 3),
('Summer Jewelry Auction', '2023-12-31', 'Summer Auction', '2023-12-01', '2023-11-01', 'PAST', 4),
('Autumn Jewelry Auction', '2023-11-15', 'Autumn Auction', '2023-11-01', '2023-10-10', 'PAST', 5),
('New Year Jewelry Auction', '2024-01-15', 'New Year Auction', '2024-01-01', '2023-12-15', 'PAST', 6),
('Festive Jewelry Auction', '2024-02-28', 'Festive Auction', '2024-02-01', '2024-01-10', 'PAST', 7),
('Exclusive New Arrivals Auction', '2024-01-30', 'New Arrivals Auction', '2024-01-01', '2023-12-10', 'PAST', 8),
('Luxury Jewelry Auction', '2023-10-15', 'Luxury Auction', '2023-10-01', '2023-09-10', 'PAST', 9),
('Classic Jewelry Auction', '2023-09-30', 'Classic Auction', '2023-09-01', '2023-08-10', 'PAST', 10);


-- Insert to lot
INSERT INTO jewelryauction.lot (current_price, status, auction_session_id, product_id) VALUES
-- PENDING_MANAGER_APPROVAL
(500.0, 'WAITING', NULL, 2),
-- MANAGER_APPROVED
(750.0, 'WAITING', NULL, 5),
-- PENDING_MEMBER_ACCEPTANCE
(650.0, 'WAITING', NULL, 6),
-- MEMBER_ACCEPTED
(1200.0, 'READY', 10, 9),
(1400.0, 'READY', 15, 11);





