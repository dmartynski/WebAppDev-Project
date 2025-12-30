# Assignment 2 - Web API.

Name: Dominik Martynski

## Features.

No new features.

## Setup requirements.

Same setup as the first project. Must run the movies-api database at the same time as the react project.

## API Configuration

.env variables
______________________
(In main directory)
REACT_APP_TMDB_KEY= YOUR KEY
(In movies-api directory)
MONGO_DB= YOUR KEY
TMDB_KEY= SAME KEY AS IN MAIN
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
//  2 new API calls
- /api/users | GET | gets users details.
- /api/movies/{movieid}/runtime | GET | Get runtime of movie from database.

## Security and Authentication (40%)

Login and Registration is set up. When you don't have a valid token, favourites and watchlist are protected routes. A logout button is present which removes your token from the website. (I think thats 55-69%)

## Integrating with React App (30%)

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

Added login, register and logout buttons to the header. All users usernames are displayed on the bottom of the homepage, like on old forums. 
Login and Register work just how they did in the movies-api labs, so that counts as integration I think. 
New page which lists movies from the database. (I think this should be baseline 40-54%)

## Independent learning (if relevant)

Nothing I can think of.