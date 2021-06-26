delete from company_has_stockexchange
delete from stockprice
delete from ipo
delete from company
delete from stockexchange
delete from sectors



insert into sectors(id,name,description) values(10001,'Pharmaceutical','JPA')
insert into sectors(id,name,description) values(10002,'FoodNAgro','H2')
insert into sectors(id,name,description) values(10003,'Telecom','Spring')
insert into sectors(id,name,description) values(10004,'Petrochemical','SpringBoot')


insert into stockexchange(id,stockexchangename,brief,contactaddress,remarks) values(20001,'NSE','Indian Stock exchange','Mumbai,India','E123654')
insert into stockexchange(id,stockexchangename,brief,contactaddress,remarks) values(20002,'BSE','Indian Stock exchange','Mumbai,India','E167238')
insert into stockexchange(id,stockexchangename,brief,contactaddress,remarks) values(20003,'NASDAQ','USA stock exchange','New York,USA','S253849')
insert into stockexchange(id,stockexchangename,brief,contactaddress,remarks) values(20004,'TYO','Japanese stock exchange','Tokyo, Japan','A562930')

insert into company(id,companyname,turnover,ceo, boardofdirectors,description,sectorname,stockexchangename,companycode,sectors_id) values(30001,'Reliance Jio',234400,'Mukesh Ambani','Nita Ambani, Mehul Chaudhary, Rakesh Mehra','India"s largest Mobile Company','Telecom','NSE,BSE',"QW123,QW124",10003)
insert into company(id,companyname,turnover,ceo, boardofdirectors,description,sectorname,stockexchangename,companycode,sectors_id) values(30002,'Mankind',134400,'Mohan Roy','Mudit Roy, Mina Iyer, Ramesh Choski','Pharmaceutical Company','Pharmaceutical','','',10001)
insert into company(id,companyname,turnover,ceo, boardofdirectors,description,sectorname,stockexchangename,companycode,sectors_id) values(30003,'Britannia',434400,'Jeff Marsden','Martin Jacindia, Thomas Guptil, Hiralal Mehta','FoodNAgro Company','Telecom','NSE','RT478',10003)
insert into company(id,companyname,turnover,ceo, boardofdirectors,description,sectorname,stockexchangename,companycode,sectors_id) values(30004,'Sun Pharma',123400,'Scott James','Mukul Roy, Hamsa Singh, Hiralal Mehta','Pharmaceutical Company','Pharmaceutical','NASDAQ',"WE234",10001)

insert into company_has_stockexchange(id,code,stockexchange_id,company_id) values(60001,"QW123",20001,30001)
insert into company_has_stockexchange(id,code,stockexchange_id,company_id) values(60002,"QW341",20002,30001)
insert into company_has_stockexchange(id,code,stockexchange_id,company_id) values(60003,"WE234",20003,30004)
insert into company_has_stockexchange(id,code,stockexchange_id,company_id) values(60004,"RT478",20001,30003)

insert into ipo(id,price,shares,opendatetime,remarks,companyname,stockexchangename,company_id) values(40001,12.3,1400,'12-03-1999 12:23:45','qwerty','Britannia','NSE',30003)
insert into ipo(id,price,shares,opendatetime,remarks,companyname,stockexchangename,company_id) values(40002,42.4,1500,'12-03-1998 11:34:13','qwert3ry','Mankind','BSE',30001)
insert into ipo(id,price,shares,opendatetime,remarks,companyname,stockexchangename,company_id) values(40003,122.3,1400,'12-03-2009 02:22:50','qazwsxedc','Sun Pharma','NASDAQ',30004)

insert into stockprice(id,currentprice,date,time,companycode,stockexchangename, company_id) values(50001,123,'12-07-2021','12:43:32','QW432','NSE',30002)
insert into stockprice(id,currentprice,date,time,companycode,stockexchangename, company_id) values(50002,122.6,'13-07-2021','10:43:32','QW341','BSE',30003)
insert into stockprice(id,currentprice,date,time,companycode,stockexchangename, company_id) values(50003,133.45,'13-07-2021','11:43:32','WE234','NASDAQ',30004)

