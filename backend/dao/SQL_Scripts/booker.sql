CREATE SCHEMA IF NOT EXISTS Booker;
USE Booker;

CREATE TABLE IF NOT EXISTS User (
	UserID VARCHAR(36) NOT NULL,
    Name VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Password VARCHAR(150) NOT NULL,
    BusinessOwner SMALLINT NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Industry (
	IndustryID INT AUTO_INCREMENT,
    IndustryName VARCHAR(255),
    PRIMARY KEY (IndustryID)
);

CREATE TABLE IF NOT EXISTS Services(
	ServiceID INT AUTO_INCREMENT,
    ServiceName VARCHAR(255),
    PRIMARY KEY (ServiceID)
);

CREATE TABLE IF NOT EXISTS BusinessAccount (
    UserID VARCHAR(36) NOT NULL,
    BusinessName VARCHAR(150),
    BusinessType VARCHAR (150),
    Phone VARCHAR(150),
    Website VARCHAR(150), 
    BusinessServiceID VARCHAR(36),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE IF NOT EXISTS BusinessServices (
	BusinessAccountID VARCHAR(36),
    ServiceID INT,
    IndustryID INT,
    FOREIGN KEY (BusinessAccountID) REFERENCES BusinessAccount(UserID),
    FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID),
    FOREIGN KEY (IndustryID) REFERENCES Industry(IndustryID)
);

DELIMITER %%
CREATE TRIGGER CreateBusinessAccount AFTER INSERT ON User
FOR EACH ROW
BEGIN
  IF NEW.BusinessOwner = 1 THEN
    INSERT INTO BusinessAccount (UserID) VALUES (NEW.UserID);
  END IF; 
END %%;
DELIMITER ; 