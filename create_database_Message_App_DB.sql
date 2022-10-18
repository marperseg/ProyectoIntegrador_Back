create database Message_App_DB;
create table Message_App_DB.users (
	userId varchar(128),
    userName varchar(128),
    firstName varchar(128),
    lastName varchar (128),
    password varchar(128),
    country varchar(40),
    city varchar(40),
    nSentM int,
    nRecievedM int,
    nUnreadM int,
    primary key (userId)
    );
    
  --      sessionToken varchar(128)