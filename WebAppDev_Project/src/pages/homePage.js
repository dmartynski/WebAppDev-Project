import React, { useState, useEffect } from "react";
import { getMovies } from "../api/tmdb-api";
import { getUsernames } from "../api/movies-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: moviesData, error: moviesError, isLoading: moviesLoading, isError: isMoviesError } = useQuery(
    ['discover', currentPage],
    () => getMovies(currentPage),
    {
      keepPreviousData: true,
    }
  );

  const { data: usernamesData, error: usernamesError, isLoading: usernamesLoading, isError: isUsernamesError } = useQuery(
    'usernames',
    getUsernames
  );

  if (moviesLoading || usernamesLoading) {
    return <Spinner />;
  }

  if (isMoviesError) {
    return <h1>{moviesError.message}</h1>;
  }

  if (isUsernamesError) {
    return <h1>{usernamesError.message}</h1>;
  }

  const movies = moviesData.results;
  const usernames = usernamesData.map(user => user.username); 

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Pagination
          count={moviesData.total_pages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <h2>All Users:</h2>
        <ul>
          {usernames.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      </Grid>
    </>
  );
};

export default HomePage;