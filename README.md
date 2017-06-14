# Home Field Advantage  

![Imgur](http://i.imgur.com/r5CmvPTl.jpg)

### Share tips, recommendations and experiences for at different sports stadiums across North America.  

Users will be able to make comments and add experiences to different topics or categories for each stadium in North America.

## API  
Because the API's I was hoping to use (ESPN) is no longer public, I basically had to create my own API (work-in-progress) that is a list of all of the professionals sports stadiums in North America (mainly the USA).

## Instructions for Use  
To download and run the App, install the package.json dependencies and seed your database with the data in the migrations folder.  

#### ROUTES
**url/** --> Home page with list of sports and into to stadium_website  
**url/stadiums** --> page listing all of the stadiums in the USA  
**url/stadiums/:stadiumId** --> individual stadium's page with comments from users sorted by most popular  
**url/stadiums/:stadiumId/comments/new** --> create a new comment for the specific stadium  
**url/stadiums/:stadiumId/comment/:commentId** --> edit/update/delete a comment.

Database Schema

![Imgur](http://i.imgur.com/plXbR2o.png)


Wire-Frame starts

![Imgur](http://i.imgur.com/7XYfbba.jpg)
![Imgur](http://i.imgur.com/Bt3htG4.jpg)
![Imgur](http://i.imgur.com/MRmCSeZ.jpg)
