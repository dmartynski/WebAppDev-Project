# WebAppDev-Project
A project coded in JavaScript using React, involving both front and back end web app development, with CRUD functionality. Contains security authentication. 

## Change variables in this file to your personal moviesdb and mongodb keys
.env variables(In main directory) 
REACT_APP_TMDB_KEY= YOUR KEY (In movies-api directory) MONGO_DB= YOUR KEY TMDB_KEY= SAME KEY AS IN MAIN

## Getter and Post functionality
    /api/movies | GET | Gets a list of movies
    /api/movies/{movieid} | GET | Gets a single movie
    /api/movies/{movieid}/reviews | GET | Get all reviews for movie
    /api/movies/{movieid}/reviews | POST | Create a new review for Movie // 2 new API calls
    /api/users | GET | gets users details.
    /api/movies/{movieid}/runtime | GET | Get runtime of movie from database.
