# Jewlry Auction System
### Member:
1. Nguyen Van Dai - Leader - Frontend Developer
2. Nguyen Hai Linh - Backend Developer
3. Tran Quang Huy - Backend Developer
4. Tran Gia Huy - Backend Developer
5. Nguyen Ha Viet Anh - Frontend Developer
6. Nguyen Duc Dat - Frontend Developer
### Introduction
This is a capstone project developed by Team 6 - SE1839 - SWP391. The project involves creating an auction system where anyone can initiate an auction with their jewelry or participate in an online auction.
### Project Objectives
1. **User-Friendly Interface**: Develop a simple and intuitive interface for users to easily navigate the auction system, ensuring a seamless user experience for both sellers and buyers.
2. **Auction Functionality**: Enable users to initiate their own auctions, providing tools for listing jewelry items, setting starting bids, and defining auction duration.
3. **Real-Time Bidding**: Implement real-time bidding features, allowing participants to place bids and receive updates instantly during the auction process.
4. **Scalability**: Design the system to be scalable, allowing it to handle a growing number of users and auctions without compromising performance.
### Major Features
1. User Authentication and Management
2. Auction Browsing and Interaction
3. Auction Participation and Management
4. Member and Staff Interactions
5. Auction Control and Dashboard
6. User Account Administration
### Technology
1. Backend: Spring boot <3.3.0>
2. Fontend: React <18.3.1>
3. Database: MySQL 8.0
## Database_diagram
![Database](database/database.png)
### Overview pictures
![Home page](https://github.com/dainvse170297/Jewelry-Auction-System/assets/169271340/e848c79e-4292-493a-bbf9-92fcf8ac7ba2)
![Auction Page](https://github.com/dainvse170297/Jewelry-Auction-System/assets/169271340/fe6f1333-2261-4dc1-b052-fe16f0ebe101)
### Sprint 1
1. Task Assignment
   ![image](https://github.com/dainvse170297/Jewelry-Auction-System/assets/169271340/b6d85784-c293-4287-9cc2-a2fccaf0c33c)
### Use case List
No
ID
Use Case
Actors
Description
1
UC-GU001
Login
Guest
Đăng nhập bằng account/ google
2
UC-GU002
Register
Guest
Đăng ký tài khoản
3
UC-GU003
Forgot password
Guest
Quên mật khẩu, confirm bằng code được gửi qua gmail
4
UC-GU004
View auctions session list 
Guest, member
Xem danh sách các phiên (upcoming, current, past)
5
UC-GU005
View auctions session detail
Guest, member
Xem chi tiết phiên, gồm danh sách các lots 
6
UC-GU006
View Lots detail
Guest, member
Xem chi tiết 1 lot, là thông tin đấu giá của 1 product
7
UC-GU007
Search auctions
Guest, member
Search Lots trong 1 session theo filter
8
UC-GU008
View policies, terms and conditions
Guest, member
Xem quy định, chính sách
9
UC-GU009
View contact info
Guest, member
Xem thông tin liên hệ
10
UC-MB001
Logout
Member, staff, manager, admin
Đăng xuất
11
UC-MB002
View profile
Member
Xem thông tin tài khoản
12
UC-MB003
Edit profile
Member
Chỉnh sửa thông tin tài khoản, được sửa tất cả các mục
13
UC-MB004
Change password
Member, staff, manager, admin 
Thay đổi mật khẩu (nhập mật khẩu cũ r nhập lại mật khẩu mới 2 lần)
14
UC-MB005
Sent Financial proof request
Member
Chứng minh tài chính, chỉ cần gửi ảnh để chứng minh
15
UC-MB006
View notification
Member
Xem các thông báo được gửi đến
16
UC-MB007
Sent Valuation request
Member
Gửi yêu cầu giám định trang sức
17
UC-MB008
View send valuation request
Member
Xem các yêu cầu giám định đã gửi
18
UC-MB009
View Valuation response
Member
Xem phản hồi của các yêu cầu giám định
19
UC-MB010
Confirm Final Valuation
Member
Chấp nhận định giá cuối cùng với trang sức đã yêu cầu định giá
20
UC-MB011
Register to bid
Member
Đăng ký cuộc đấu giá, nhận thông báo khi đấu giá bắt đầu, chỉ được tham gia các cuộc đấu giá đã đăng ký
21
UC-MB012
View list registered auction
Member
Xem danh sách các lots đấu giá đã đăng ký
22
UC-MB013
Cancel registered auctions
Member
Hủy một phiên đấu giá đã đăng ký, chỉ hủy được các phiên chưa diễn ra
23
UC-MB014
Place bid before auctions
Member
Đặt giá trước khi đấu giá, phải đăng kí trước rồi mới được đặt trước giá, chỉ đặt được cho những sản phẩm đã đăng kí
24
UC-MB015
View live auction
Member
Xem phiên đấu giá đang diễn ra 
25
UC-MB016
Place bid in the auctions
Member
Đặt giá trong cuộc đấu giá, đặt theo các mốc đã cho trước, hiện thông tin giá đã đặt của mình
26
UC-MB017
View my past auction
Member
Xem lịch sử các phiên đấu giá đã tham gia
27
UC-MB018
View payment information
Member
Xem thông tin thanh toán cho sản phẩm thắng đấu giá
28
UC-MB019
Pay auction
Member
Thanh toán nếu đấu giá thành công
29
UC-ST001
View member’s valuation request
Staff
Xem danh sách các yêu cầu giám định được gửi đến
30
UC-ST002
Send preliminary valuation report
Staff
Hoàn thành và gửi báo cáo định giá sơ bộ trang sức cho người dùng
31
UC-ST003
Confirm jewelry is received 
Staff
Confirm jewelry when member send to company
32
UC-ST004
Create a new jewelry
Staff
Tạo thông tin cho 1 sản phẩm đã được nhận dựa trên yêu cầu định giá, chỉnh sửa thông tin về sản phẩm và lưu về database riêng 
33
UC-ST005
Send final valuation to Manager
Staff
Hoàn thành và gửi định giá cuối cùng cho manager phê duyệt
34
UC-ST006
Send final valuation to Member
Staff 
Gửi thông tin định giá cuối cùng cho member
35
UC-ST007
View Financial proof request
Staff
Xem các yêu cầu chứng minh tài chính được gửi đến
36
UC-ST008
Confirm financial proof request
Staff
Xác định số tiền chứng minh tài chính cho member
37
UC-ST009
Pause auction
Staff
Tạm dừng phiên
38
UC-ST010
Continue auction
Staff
Tiếp tục phiên
39
UC-ST011
View assigned auctions
Staff
Xem các phiên đấu giá được phân công
40
UC-MN001
View final valuation request
Manager
Xem các định giá cuối cùng được gửi từ staff
41
UC-MN002
Confirm an auction request
Manager
Approve the final auction request send from Staff
42
UC-MN003
Create auction session
Manager
Tạo các phiên đấu giá


UC-MN004
View ready lots
Manager
Xem danh sách các lot được người dùng chấp nhận đấu giá và sẵn sàng đưa vào đấu giá
43
UC-MN005
Set up auction
Manager
Set up các lots vào trong session
44
UC-MN007
View Dashboard
Manager
Xem các bảng thống kê số liệu, dựa vào các filter
45
UC-MN008
View existed Payment 
Manager
Xem các hóa đơn
46
UC-AD001
Create Account
Admin
Tạo tài khoản, setup role
47
UC-AD002
Edit Account Information
Admin
Chỉnh sửa thông tin tài khoản
48
UC-AD003
Delete Account
Admin
Xóa tài khoản

