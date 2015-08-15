# HolmuskChallange

## Running the Application
This application uses Sails.js, Node.js and MongoDB. 
Pre requisite to run this application is to install the following

1.	Sails.js: http://sailsjs.org/get-started
2.	Node.js: https://nodejs.org/download/
3.	MongoDB: http://docs.mongodb.org/manual/installation/

## Start the MongoDB server
Command: mongod.exe --config D:\ProjectFolder\Database\mongodb\mongo.config

Note: Make sure server get started at default port 27017

## Start the Sails.js
Command: sails lift

Server will be started and will be available at: http://localhost:1337/

## User Interface
Go to the URL: http://localhost:1337/

### Start scraping
Click on the start scraping button to scrape the items from the http://www.myfitnesspal.com/

### Searching
Type a character in the text box to search for the item.

### Searched Item
Select any items from the drop down to get the detailed description.

## Manual Fill
Enter Name, Company name and other nutrition details and click Add Data to save to Database.

Note: Name is mandatory field. As searching is done based on Name

## Areas of Improvement
1.	Searching using Elastic search will be more ideal.
2.	To scrape entire web, multiple connections has to be maintained so that it should not go to timeout state.
3.	Scraped data before inserting into the database check for the duplicate item.





