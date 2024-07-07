create database jewelryauction
use jewelryauction
go
CREATE TABLE account (
  account_id  int(10) NOT NULL AUTO_INCREMENT, 
  role_id     int(10) NOT NULL, 
  username    varchar(50), 
  password    varchar(50), 
  create_date date, 
  PRIMARY KEY (account_id));
CREATE TABLE `auction register` (
  register_id    int(10) NOT NULL AUTO_INCREMENT, 
  member_id      int(10) NOT NULL, 
  lot_id         int(10) NOT NULL, 
  previous_price decimal(19, 1), 
  current_price  decimal(19, 1), 
  final_price    decimal(19, 1), 
  status         varchar(30), 
  PRIMARY KEY (register_id));
CREATE TABLE `auction session` (
  auction_session_id int(10) NOT NULL AUTO_INCREMENT, 
  staff_id           int(10) NOT NULL, 
  starting_bid       date, 
  start_time         date, 
  end_time           date, 
  name               varchar(50), 
  description        varchar(1000), 
  status             varchar(30), 
  PRIMARY KEY (auction_session_id));
CREATE TABLE bid (
  bids_id   int(10) NOT NULL AUTO_INCREMENT, 
  member_id int(10) NOT NULL, 
  lot_id    int(10) NOT NULL, 
  price     decimal(19, 1), 
  time      date, 
  PRIMARY KEY (bids_id));
CREATE TABLE category (
  category_id int(10) NOT NULL AUTO_INCREMENT, 
  name        varchar(50), 
  description varchar(1000), 
  PRIMARY KEY (category_id));
CREATE TABLE `credit card` (
  credit_card_id int(10) NOT NULL AUTO_INCREMENT, 
  account_holder varchar(50), 
  bank_number    varchar(20), 
  bank_name      varchar(50), 
  PRIMARY KEY (credit_card_id));
CREATE TABLE `financial proof image` (
  image_id                   int(11) NOT NULL AUTO_INCREMENT, 
  financial_proof_request_id int(10) NOT NULL, 
  image_url                  varchar(255), 
  default_image              varchar(255), 
  PRIMARY KEY (image_id));
CREATE TABLE `financial proof request` (
  financial_proof_request_id int(10) NOT NULL AUTO_INCREMENT, 
  member_id                  int(10) NOT NULL, 
  staff_Id                   int(10) NOT NULL, 
  manager_Id                 int(10) NOT NULL, 
  image                      varchar(255), 
  status                     varchar(30), 
  financial_proof_amount     decimal(19, 1), 
  time_request               datetime NULL, 
  PRIMARY KEY (financial_proof_request_id));
CREATE TABLE `invalid token` (
  id           varchar(50) NOT NULL, 
  expired_time datetime NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE lot (
  lot_id             int(10) NOT NULL AUTO_INCREMENT, 
  product_id         int(10) NOT NULL, 
  auction_session_id int(10) NOT NULL, 
  current_price      decimal(19, 1), 
  status             varchar(30), 
  start_price        decimal(19, 1), 
  current_winner_id  int(11), 
  buy_now_price      decimal(19, 1), 
  price_per_step     decimal(19, 1), 
  max_step           int(11), 
  PRIMARY KEY (lot_id));
CREATE TABLE manager (
  manager_Id int(10) NOT NULL AUTO_INCREMENT, 
  account_id int(10) NOT NULL, 
  fullname   varchar(100), 
  PRIMARY KEY (manager_Id));
CREATE TABLE member (
  member_id              int(10) NOT NULL AUTO_INCREMENT, 
  credit_card_id         int(10) NOT NULL, 
  account_id             int(10) NOT NULL, 
  financial_proof_amount decimal(19, 1), 
  address                varchar(100), 
  phone                  varchar(10), 
  fullname               varchar(50), 
  email                  varchar(50) NOT NULL, 
  PRIMARY KEY (member_id));
CREATE TABLE notify (
  notify_id     int(10) NOT NULL AUTO_INCREMENT, 
  member_id     int(10) NOT NULL, 
  title         varchar(50), 
  description   varchar(1000), 
  `date`        datetime NULL, 
  is_read       bit(1), 
  notifiable_id int(10), 
  notifi_type   varchar(30), 
  PRIMARY KEY (notify_id));
CREATE TABLE `payment info` (
  payment_id          int(10) NOT NULL AUTO_INCREMENT, 
  auction_register_id int(10) NOT NULL, 
  image_url           varchar(255), 
  status              varchar(30), 
  creation_time       date, 
  amount              decimal(19, 1), 
  PRIMARY KEY (payment_id));
CREATE TABLE product (
  product_id         int(10) NOT NULL AUTO_INCREMENT, 
  category_id        int(10) NOT NULL, 
  name               varchar(50), 
  description        varchar(1000), 
  estimate_price_max decimal(19, 1), 
  estimate_price_min decimal(19, 1), 
  PRIMARY KEY (product_id));
CREATE TABLE `product image` (
  productimage_id int(10) NOT NULL AUTO_INCREMENT, 
  product_id      int(10) NOT NULL, 
  imageurl        varchar(255), 
  default_image   varchar(255), 
  PRIMARY KEY (productimage_id));
CREATE TABLE `response valuation request` (
  response_id          int(10) NOT NULL AUTO_INCREMENT, 
  staff_Id             int(10) NOT NULL, 
  valuation_request_id int(10) NOT NULL, 
  status               varchar(20), 
  valuation_price_min  decimal(19, 2), 
  valuation_price_max  decimal(19, 2), 
  time_response        date, 
  PRIMARY KEY (response_id));
CREATE TABLE role (
  role_id     int(10) NOT NULL AUTO_INCREMENT, 
  name        varchar(50), 
  description varchar(255), 
  PRIMARY KEY (role_id));
CREATE TABLE seller_payment (
  id             int(11) NOT NULL AUTO_INCREMENT, 
  payment_date   datetime NULL, 
  transferAmount decimal(19, 1), 
  member_id      int(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE seller_payment_img (
  id               int(11) NOT NULL AUTO_INCREMENT, 
  imageUrl         varchar(255), 
  transferAmount   decimal(19, 1), 
  seller_paymentid int(11) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE staff (
  staff_Id   int(10) NOT NULL AUTO_INCREMENT, 
  account_id int(10) NOT NULL, 
  fullname   varchar(100), 
  PRIMARY KEY (staff_Id));
CREATE TABLE `valuation image` (
  image_id      int(10) NOT NULL AUTO_INCREMENT, 
  request_id    int(10) NOT NULL, 
  image_url     varchar(255), 
  default_image varchar(255), 
  PRIMARY KEY (image_id));
CREATE TABLE `valuation request` (
  valuation_request_id  int(10) NOT NULL AUTO_INCREMENT, 
  member_id             int(10) NOT NULL, 
  product_id            int(10) NOT NULL, 
  time_request          date, 
  description           varchar(1000), 
  valuation_status      varchar(30), 
  delivery_status       varchar(30), 
  estimate_price_min    decimal(19, 1), 
  estimate_price_max    decimal(19, 1), 
  member_estimate_price decimal(19, 1), 
  cancel_reason         varchar(20), 
  PRIMARY KEY (valuation_request_id));
ALTER TABLE member ADD CONSTRAINT FKmember213266 FOREIGN KEY (account_id) REFERENCES account (account_id);
ALTER TABLE `valuation image` ADD CONSTRAINT `FKvaluation 861200` FOREIGN KEY (request_id) REFERENCES `valuation request` (valuation_request_id);
ALTER TABLE `valuation request` ADD CONSTRAINT `FKvaluation 263327` FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE `product image` ADD CONSTRAINT `FKproduct im467462` FOREIGN KEY (product_id) REFERENCES product (product_id);
ALTER TABLE product ADD CONSTRAINT FKproduct370273 FOREIGN KEY (category_id) REFERENCES category (category_id);
ALTER TABLE lot ADD CONSTRAINT FKlot317620 FOREIGN KEY (product_id) REFERENCES product (product_id);
ALTER TABLE lot ADD CONSTRAINT FKlot883708 FOREIGN KEY (auction_session_id) REFERENCES `auction session` (auction_session_id);
ALTER TABLE member ADD CONSTRAINT FKmember953629 FOREIGN KEY (credit_card_id) REFERENCES `credit card` (credit_card_id);
ALTER TABLE staff ADD CONSTRAINT FKstaff741179 FOREIGN KEY (account_id) REFERENCES account (account_id);
ALTER TABLE `auction register` ADD CONSTRAINT `FKauction re974032` FOREIGN KEY (lot_id) REFERENCES lot (lot_id);
ALTER TABLE notify ADD CONSTRAINT FKnotify982105 FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE `financial proof image` ADD CONSTRAINT `FKfinancial 489750` FOREIGN KEY (financial_proof_request_id) REFERENCES `financial proof request` (financial_proof_request_id);
ALTER TABLE `financial proof request` ADD CONSTRAINT `FKfinancial 501101` FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE `financial proof request` ADD CONSTRAINT `FKfinancial 178982` FOREIGN KEY (staff_Id) REFERENCES staff (staff_Id);
ALTER TABLE account ADD CONSTRAINT FKaccount957206 FOREIGN KEY (role_id) REFERENCES role (role_id);
ALTER TABLE manager ADD CONSTRAINT FKmanager726504 FOREIGN KEY (account_id) REFERENCES account (account_id);
ALTER TABLE `financial proof request` ADD CONSTRAINT `FKfinancial 622924` FOREIGN KEY (manager_Id) REFERENCES manager (manager_Id);
ALTER TABLE `response valuation request` ADD CONSTRAINT `FKresponse v600724` FOREIGN KEY (staff_Id) REFERENCES staff (staff_Id);
ALTER TABLE `response valuation request` ADD CONSTRAINT `FKresponse v643758` FOREIGN KEY (valuation_request_id) REFERENCES `valuation request` (valuation_request_id);
ALTER TABLE `auction register` ADD CONSTRAINT `FKauction re509374` FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE `payment info` ADD CONSTRAINT `FKpayment in367579` FOREIGN KEY (auction_register_id) REFERENCES `auction register` (register_id);
ALTER TABLE bid ADD CONSTRAINT FKbid258773 FOREIGN KEY (lot_id) REFERENCES lot (lot_id);
ALTER TABLE bid ADD CONSTRAINT FKbid770589 FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE `auction session` ADD CONSTRAINT `FKauction se842697` FOREIGN KEY (staff_id) REFERENCES staff (staff_Id);
ALTER TABLE seller_payment ADD CONSTRAINT FKseller_pay946051 FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE seller_payment_img ADD CONSTRAINT FKseller_pay582738 FOREIGN KEY (seller_paymentid) REFERENCES seller_payment (id);
ALTER TABLE `valuation request` ADD CONSTRAINT `FKvaluation 610241` FOREIGN KEY (product_id) REFERENCES product (product_id);
